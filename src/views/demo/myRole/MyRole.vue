<template>
  <div class="p-2">
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus" @click="onAdd">新增</a-button>
      </template>

      <template #action="{ record }">
        <TableAction :actions="getTableActions(record)" />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="onSuccess" />
  </div>
</template>

<script lang="ts">
  import type { ActionItem } from '/@/components/Table';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { list } from './role.api';
  import RoleModal from './RoleModal.vue';
  import { useModal } from '/@/components/Modal';

  export default {
    name: 'MyRole',
    components: { RoleModal, TableAction, BasicTable },
    setup() {
      const { tableContext } = useListPage({
        tableProps: {
          api: list,
          // api: () => {
          //   return new Promise<any>((resolve) => {
          //     resolve([
          //       { roleName: '管理员', roleCode: 'admin' },
          //       { roleName: '普通用户', roleCode: 'user' },
          //     ]);
          //   });
          // },
          columns: [
            {
              title: '角色名',
              dataIndex: 'roleName',
            },
            {
              title: '角色编码',
              dataIndex: 'roleCode',
            },
          ],
        },
      });

      const [registerTable, { reload }] = tableContext;

      const [registerModal, { openModal }] = useModal();
      function onAdd() {
        openModal(true, { isUpdate: false });
      }

      function onEdit(record) {
        openModal(true, { isUpdate: true, record });
      }

      function onSuccess() {
        reload();
      }

      function getTableActions(record): ActionItem[] {
        return [
          {
            label: '编辑',
            onClick: () => onEdit(record),
          },
        ];
      }

      return {
        registerTable,
        registerModal,
        onAdd,
        onSuccess,
        getTableActions,
        onEdit,
      };
    },
  };
</script>

<style scoped></style>
