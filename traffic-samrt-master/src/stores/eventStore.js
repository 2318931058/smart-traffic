import { defineStore } from "pinia";

export const useEventStore = defineStore("event", () => {
  /* 事件更新对话框是否显示 */
  const dialogTableVisible = ref(false);
  const changeDalogVisible = (val) => {
    dialogTableVisible.value = val;
  };
  /* 所有事件的列表 */
  const totalEventList = ref([]);
  const changeTotalEventList = (val) => {
    totalEventList.value = val;
  };
  /* 事件拉框查询对话框是否显示 */
  const eventListVisible = ref(false);
  const changeEventListVisible = (val) => {
    eventListVisible.value = val;
  };
  /* 事件拉框查询的列表 */
  const eventList = ref([]);
  const changeEventList = (val) => {
    eventList.value = val;
  };

  /* 事件分页列表 */
  const renderList = ref([]);
  const changeRenderList = (val) => {
    renderList.value = val;
  };

  /* 最远路径是否显示 */
  const shortPathVisible = ref(false)
  const changeShortPathVisible = (val) => {
    shortPathVisible.value = val;
  };
  return {
    dialogTableVisible,
    changeDalogVisible,
    totalEventList,
    changeTotalEventList,
    eventListVisible,
    changeEventListVisible,
    eventList,
    changeEventList,
    renderList,
    changeRenderList,
    shortPathVisible,
    changeShortPathVisible
  };
});
