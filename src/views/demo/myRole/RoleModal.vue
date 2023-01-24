<template>
  <BasicModal @register="registerModal" :title="title" @ok="onSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { add,edit } from './role.api';
  import { ref, computed } from 'vue';

  export default {
    name: 'RoleModal',
    components: {
      BasicModal,
      BasicForm,
    },
    emits: ['register', 'success'],
    setup(props, { emit }) {
      //注册表单
      const [registerForm, { validate, resetFields, setFieldsValue }] = useForm({
        schemas: [
          {
            label: '角色名称',
            field: 'roleName',
            component: 'Input',
          },
          {
            label: '角色编码',
            field: 'roleCode',
            component: 'Input',
          },
          {
            label: '备注',
            field: 'description',
            component: 'InputTextArea',
          },
        ],
        showActionButtonGroup: false,
      });

      const isUpdate = ref<boolean>(false);
      const title = computed<String>(() => (isUpdate.value ? '编辑' : '新增'));
      let model = {};

      //注册弹窗
      const [registerModal, { closeModal }] = useModalInner(async (data) => {
        isUpdate.value = data.isUpdate;
        await resetFields();

        if (isUpdate.value) {
          model = data.record;
          await setFieldsValue(data.record);
        }
      });
      async function onSubmit() {
        const values = await validate();
        if (isUpdate.value) {
          let formData = Object.assign(model, values);
          await edit(formData);
        } else {
          await add(values);
        }
        closeModal();
        emit('success');
      }
      return {
        registerModal,
        registerForm,
        onSubmit,
        title,
      };
    },
  };
</script>

<style scoped></style>
