import type { Dimensions, Position, XYPosition } from './flow'
import type { Connection } from './connection'
import type { GraphEdge } from './edge'
import type { GraphNode } from './node'

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: string | null
  position: Position
}

export interface ConnectionHandle {
  id: string | null
  type: HandleType | null
  nodeId: string
  x: number
  y: number
}

export interface ValidHandleResult {
  endHandle: ConnectingHandle | null
  handleDomNode: Element | null
  isValid: boolean
  connection: Connection
}

export interface ConnectingHandle {
  nodeId: string
  type: HandleType
  handleId: string | null
}

/** A valid connection function can determine if an attempted connection is valid or not, i.e. abort creating a new edge */
export type ValidConnectionFunc = (
  connection: Connection,
  elements: { edges: GraphEdge[]; sourceNode: GraphNode; targetNode: GraphNode },
) => boolean

export type HandleConnectableFunc = (node: GraphNode, connectedEdges: GraphEdge[]) => boolean

/**
 * set to true to allow unlimited connections,
 * single for only one connection
 * or use a cb function to determine connect-ability
 *
 * if set to single and the handle already has more than one connection, it will act the same as setting it to false
 */
export type HandleConnectable = boolean | number | 'single' | HandleConnectableFunc

export interface HandleProps {
  /** Unique id of handle element */
  id?: string
  /** Handle type (source / target) {@link HandleType} */
  type?: HandleType
  /** Handle position (top, bottom, left, right) {@link Position} */
  position?: Position
  /** A valid connection func {@link ValidConnectionFunc} */
  isValidConnection?: ValidConnectionFunc
  /** Enable/disable connecting to handle altogether */
  connectable?: HandleConnectable
  /** Can this handle be used to *start* a connection */
  connectableStart?: boolean
  /** Can this handle be used to *end* a connection */
  connectableEnd?: boolean
}
