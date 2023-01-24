import { defHttp } from '/@/utils/http/axios';

enum RoleApi {
  list = '/sys/role/list',
  save = '/sys/role/add',
  edit = '/sys/role/edit',
}

/**
 * 获取列表数据接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: RoleApi.list, params });

/**
 * 新增角色
 * @param params
 */
export const add = (params) => defHttp.post({ url: RoleApi.save, params });

/**
 * 编辑表单
 * @param params
 */
export const edit = (params) => defHttp.post({ url: RoleApi.edit, params });
