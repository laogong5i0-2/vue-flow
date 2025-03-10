import type { CSSProperties } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import type { DefaultEdgeOptions, Edge, EdgeUpdatable, GraphEdge } from './edge'
import type { CoordinateExtent, CoordinateExtentRange, GraphNode, Node } from './node'
import type { Connection, ConnectionLineOptions, ConnectionLineType, ConnectionMode, Connector } from './connection'
import type { PanOnScrollMode, ViewportTransform } from './zoom'
import type { EdgeTypesObject, NodeTypesObject } from './components'
import type { CustomEvent } from './hooks'
import type { ValidConnectionFunc } from './handle'

export type ElementData = any

/** A flow element (after parsing into state)  */
export type FlowElement<
  NodeData = ElementData,
  EdgeData = ElementData,
  NodeEvents extends Record<string, CustomEvent> = any,
  EdgeEvents extends Record<string, CustomEvent> = any,
> = GraphNode<NodeData, NodeEvents> | GraphEdge<EdgeData, EdgeEvents>

export type FlowElements<
  NodeData = ElementData,
  EdgeData = ElementData,
  NodeEvents extends Record<string, CustomEvent> = any,
  EdgeEvents extends Record<string, CustomEvent> = any,
> = FlowElement<NodeData, EdgeData, NodeEvents, EdgeEvents>[]

/** Initial elements (before parsing into state) */
export type Element<
  NodeData = ElementData,
  EdgeData = ElementData,
  NodeEvents extends Record<string, CustomEvent> = any,
  EdgeEvents extends Record<string, CustomEvent> = any,
> = Node<NodeData, NodeEvents> | Edge<EdgeData, EdgeEvents>

export type Elements<
  NodeData = ElementData,
  EdgeData = ElementData,
  NodeEvents extends Record<string, CustomEvent> = any,
  EdgeEvents extends Record<string, CustomEvent> = any,
> = Element<NodeData, EdgeData, NodeEvents, EdgeEvents>[]

export type MaybeElement = Node | Edge | Connection | FlowElement | Element
export interface CustomThemeVars {
  [key: string]: string | number | undefined
}

export type CSSVars =
  | '--vf-node-color'
  | '--vf-box-shadow'
  | '--vf-node-bg'
  | '--vf-node-text'
  | '--vf-connection-path'
  | '--vf-handle'

export type ThemeVars = { [key in CSSVars]?: CSSProperties['color'] }
export type Styles = CSSProperties & ThemeVars & CustomThemeVars
/** @deprecated will be removed in the next major version */
export type ClassFunc<ElementType extends FlowElement = FlowElement> = (element: ElementType) => string | void

/** @deprecated will be removed in the next major version */
export type StyleFunc<ElementType extends FlowElement = FlowElement> = (element: ElementType) => Styles | void

/** Handle Positions */
export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

// todo: Rename to `Point`
export interface XYPosition {
  x: number
  y: number
}

// todo: Rename to `AbsolutePoint`
export type XYZPosition = XYPosition & { z: number }

export interface Dimensions {
  width: number
  height: number
}

export interface Box extends XYPosition {
  x2: number
  y2: number
}

export interface Rect extends Dimensions, XYPosition {}

export type SnapGrid = [x: number, y: number]

export interface SelectionRect extends Rect {
  startX: number
  startY: number
}

export enum SelectionMode {
  Partial = 'partial',
  Full = 'full',
}

export interface FlowExportObject {
  nodes: Node[]
  edges: Edge[]
  /** @deprecated use `viewport` instead */
  position: [x: number, y: number]
  /** @deprecated use `viewport` instead */
  zoom: number
  viewport: ViewportTransform
}

export interface FlowProps {
  id?: string
  modelValue?: Elements
  nodes?: Node[]
  edges?: Edge[]
  /** either use the edgeTypes prop to define your edge-types or use slots (<template #edge-mySpecialType="props">) */
  edgeTypes?: EdgeTypesObject
  /** either use the nodeTypes prop to define your node-types or use slots (<template #node-mySpecialType="props">) */
  nodeTypes?: NodeTypesObject
  connectionMode?: ConnectionMode
  /** @deprecated use {@link ConnectionLineOptions.type} */
  connectionLineType?: ConnectionLineType | null
  /** @deprecated use {@link ConnectionLineOptions.style} */
  connectionLineStyle?: CSSProperties | null
  connectionLineOptions?: ConnectionLineOptions
  connectionRadius?: number
  isValidConnection?: ValidConnectionFunc | null
  deleteKeyCode?: KeyFilter | null
  selectionKeyCode?: KeyFilter | null
  multiSelectionKeyCode?: KeyFilter | null
  zoomActivationKeyCode?: KeyFilter | null
  panActivationKeyCode?: KeyFilter | null
  snapToGrid?: boolean
  snapGrid?: SnapGrid
  onlyRenderVisibleElements?: boolean
  edgesUpdatable?: EdgeUpdatable
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  nodeDragThreshold?: number
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  /** move pane on drag, replaced prop `paneMovable` */
  panOnDrag?: boolean | number[]
  minZoom?: number
  maxZoom?: number
  defaultViewport?: Partial<ViewportTransform>
  translateExtent?: CoordinateExtent
  nodeExtent?: CoordinateExtent | CoordinateExtentRange
  defaultMarkerColor?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  /** If set to false, scrolling inside the viewport will be disabled and instead the page scroll will be used */
  preventScrolling?: boolean
  selectionMode?: SelectionMode
  edgeUpdaterRadius?: number
  fitViewOnInit?: boolean
  /** allow connection with click handlers, i.e. support touch devices */
  connectOnClick?: boolean
  /** apply default change handlers for position, dimensions, adding/removing nodes. set this to false if you want to apply the changes manually */
  applyDefault?: boolean
  /** automatically create an edge when connection is triggered */
  autoConnect?: boolean | Connector
  noDragClassName?: string
  noWheelClassName?: string
  noPanClassName?: string
  /** does not work for the `addEdge` utility! */
  defaultEdgeOptions?: DefaultEdgeOptions
  /** elevates edges when selected and applies z-Index to put them above their nodes */
  elevateEdgesOnSelect?: boolean
  /** elevates nodes when selected and applies z-Index + 1000 */
  elevateNodesOnSelect?: boolean

  disableKeyboardA11y?: boolean
  edgesFocusable?: boolean
  nodesFocusable?: boolean

  autoPanOnConnect?: boolean
  autoPanOnNodeDrag?: boolean

  __experimentalFeatures?: {
    nestedFlow?: boolean
  }
}

// Todo: Remove in next major version
export type FlowOptions = FlowProps
