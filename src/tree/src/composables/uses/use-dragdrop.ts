import { Ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IDragdrop, IDraggalbe, IUseCore } from '../use-tree-type'

export default function useDragdrop(
  dragdrop: IDragdrop,
  data: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IDraggalbe {
  const onDragstart = (event: DragEvent, node: IInnerTreeNode) => {
    console.log('start', event, node)
  }
  const onDragend = (event: DragEvent) => {
    console.log('end', event)
  }
  const onDrop = (event: DragEvent, node: IInnerTreeNode) => {
    console.log('onDrop', event, node)
  }
  return {
    onDragstart,
    onDrop,
    onDragend
  }
}
