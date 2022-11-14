import { reactive, Ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IDragdrop, IDraggalbe, IUseCore, DragState } from '../use-tree-type'

export default function useDragdrop(
  dragdrop: IDragdrop,
  data: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IDraggalbe {
  const dragState = reactive<DragState>({
    dropType: undefined,
    draggingNode: null,
    draggingTreeNode: null
  })
  const { getChildren, getNodeById } = core
  //记录拖拽的数据
  const onDragstart = (event: DragEvent, node: IInnerTreeNode) => {
    event.stopPropagation()
    dragState.draggingNode = event.target as HTMLElement | null
    dragState.draggingTreeNode = node
    event.dataTransfer?.setData('dragNodeId', node.id)
  }
  const onDragover = (event: DragEvent) => {
    event.preventDefault() //触发drop事件
  }
  const onDragend = (event: DragEvent) => {
    console.log('end')
  }
  const onDrop = (event: DragEvent, node: IInnerTreeNode) => {
    event.preventDefault()
    event.stopPropagation()
    if (!dragState.draggingNode && !dragState.draggingTreeNode) return
    const dragNodeId = event.dataTransfer?.getData('dragNodeId')
    if (dragNodeId) {
      handleDrop(dragNodeId, node)
    }
  }

  const handleDrop = (dragNodeId: string, dropNode: IInnerTreeNode) => {
    // 获取正在拖拽的节点
    const dragNode = getNodeById(dragNodeId) as IInnerTreeNode

    const cloneNode = {
      ...dragNode,
      parentId: dropNode.id,
      level: dropNode.level + 1
    } as IInnerTreeNode

    const dropIndex = data.value.indexOf(dropNode)

    data.value.splice(dropIndex + 1, 0, cloneNode)
    dropNode.isLeaf = false
    const dragIndex = data.value.indexOf(dragNode)
    data.value.splice(dragIndex, 1)
    //TODO: 1父节点不可拖拽到子节点，2子节点也要一并移动，3.next&prev，4.样式区分拖拽如何操作
  }
  // const isParent = (childId, parentId) => {
  //   const childrenList = getChildren()
  // }
  return {
    onDragstart,
    onDragover,
    onDrop,
    onDragend
  }
}
