import { Connection, ElementId, Position, RevueFlowStore } from '../../types';
import { onMouseDown, ValidConnectionFunc } from './handler';
import { computed, defineComponent, inject, PropType } from 'vue';

const alwaysValid = () => true;

const Handle = defineComponent({
  props: {
    type: {
      type: String,
      required: false,
      default: 'source'
    },
    position: {
      type: String as PropType<Position>,
      required: false,
      default: Position.Top
    },
    isValidConnection: {
      type: Function as PropType<ValidConnectionFunc>,
      required: false,
      default: alwaysValid
    },
    isConnectable: {
      type: Boolean,
      required: false,
      default: true
    },
    id: {
      type: String,
      required: false,
      default: undefined
    },
    onConnect: {
      type: Function,
      required: false,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const store = inject<RevueFlowStore>('store')!;
    const nodeId = inject<ElementId>('NodeIdContext') as ElementId;
    const isTarget = computed(() => props.type === 'target');
    const onConnect = computed(() => store.onConnect);

    const onConnectExtended = (params: Connection) => {
      onConnect.value?.(params);
      props.onConnect?.(params);
    };

    const onMouseDownHandler = (event: MouseEvent) => {
      onMouseDown(
        event,
        props.id as string,
        nodeId,
        store.setConnectionNodeId,
        store.setConnectionPosition,
        onConnectExtended,
        isTarget.value,
        props.isValidConnection,
        store.connectionMode,
        undefined,
        undefined,
        store.onConnectStart,
        store.onConnectStop,
        store.onConnectEnd
      );
    };

    const handleClasses = computed(() => [
      'revue-flow__handle',
      `revue-flow__handle-${props.position}`,
      'nodrag',
      {
        source: !isTarget.value,
        target: isTarget.value,
        connectable: props.isConnectable
      }
    ]);

    return () => (
      <div
        data-handleid={props.id}
        data-nodeid={nodeId}
        data-handlepos={props.position}
        class={handleClasses.value}
        onMousedown={onMouseDownHandler}
      >
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});

export default Handle;
