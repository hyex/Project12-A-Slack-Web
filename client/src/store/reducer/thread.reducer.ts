import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  GetThreadsRequestType,
  GetThreadResponseType,
  CreateThreadRequestType,
} from '@type/thread.type'

interface ThreadState {
  threadList: GetThreadResponseType[]
  loading: boolean
  error: AxiosError | null
}

const initialState: ThreadState = {
  threadList: [],
  loading: true,
  error: null,
}

export const GET_THREADS_REQUEST = 'thread/GET_THREADS_REQUEST' as const
const GET_THREADS_SUCCESS = 'thread/GET_THREADS_SUCCESS' as const
const GET_THREADS_ERROR = 'thread/GET_THREADS_ERROR' as const
export const CREATE_THREAD = 'thread/CREATE_THREAD' as const
export const RECEIVE_CREATE_THREAD = 'thread/RECEIVE_CREATE_THREAD' as const

export const getThreads = createAsyncAction(
  GET_THREADS_REQUEST,
  GET_THREADS_SUCCESS,
  GET_THREADS_ERROR,
)<GetThreadsRequestType, GetThreadResponseType[], AxiosError>()

export const createThread = createAction(CREATE_THREAD)<
  CreateThreadRequestType
>()

export const receiveCreateThread = createAction(RECEIVE_CREATE_THREAD)<
  GetThreadResponseType
>()

const actions = {
  getThreadsRequest: getThreads.request,
  getThreadsSuccess: getThreads.success,
  getThreadsError: getThreads.failure,
  createThread,
  receiveCreateThread,
}

export type ThreadAction = ActionType<typeof actions>

const reducer = createReducer<ThreadState, ThreadAction>(initialState, {
  [GET_THREADS_REQUEST]: (state, _) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_THREADS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    threadList: [...action.payload, ...state.threadList],
  }),
  [GET_THREADS_ERROR]: (state, action) => ({
    ...state,
    threadList: [...state.threadList],
    loading: false,
    error: action.payload,
  }),
  [RECEIVE_CREATE_THREAD]: (state, action) => ({
    ...state,
    threadList: [...state.threadList, action.payload],
  }),
})

export default reducer
