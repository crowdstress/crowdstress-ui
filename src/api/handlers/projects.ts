import { NewProjectArgs, NewProjectReply, SaveProjectArgs, SaveProjectReply } from '@/api/projects';
import { AxiosReply, AxiosRequestConfig, rest } from '@/utils/rest';

export const newProject = (args: NewProjectArgs, config?: AxiosRequestConfig): AxiosReply<NewProjectReply> =>
  rest.post('/api/project', args, config);

export const saveProject = (args: SaveProjectArgs, config?: AxiosRequestConfig): AxiosReply<SaveProjectReply> =>
  rest.put(`/api/project/${args.id}`, args, config);
