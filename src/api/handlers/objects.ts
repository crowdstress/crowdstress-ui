import { GetRoomsArgs } from '@/api/objects';
import { AxiosReply, AxiosRequestConfig, rest } from '@/utils/rest';
import { Room } from '@/models/room';

export const getRooms = (args: GetRoomsArgs, config?: AxiosRequestConfig): AxiosReply<Room[]> =>
  rest.post('/api/rooms', args, config);
