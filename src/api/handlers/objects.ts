import { GetRoomsArgs, GetRoomsReply, GetWallsArgs, GetWallsReply } from '@/api/objects';
import { AxiosRequestConfig, rest } from '@/utils/rest';

export const fetchRooms = (args: GetRoomsArgs, config?: AxiosRequestConfig): GetRoomsReply =>
  rest.post('/api/math/rooms', args, config);

export const fetchWalls = (args: GetWallsArgs, config?: AxiosRequestConfig): GetWallsReply =>
  rest.post('/api/math/walls', args, config);
