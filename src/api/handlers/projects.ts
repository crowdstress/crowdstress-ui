import {
  GetProjectArgs,
  GetProjectReply,
  GetProjectsArgs,
  GetProjectsReply,
  NewProjectArgs,
  NewProjectReply,
  SaveProjectArgs,
  SaveProjectReply
} from '@/api/projects';
import { queryToString } from '@/utils/query';
import { AxiosReply, AxiosRequestConfig, rest } from '@/utils/rest';

export const newProject = (args: NewProjectArgs, config?: AxiosRequestConfig): AxiosReply<NewProjectReply> =>
  rest.post('/api/project', args, config);

export const getProjects = (args: GetProjectsArgs, config?: AxiosRequestConfig): AxiosReply<GetProjectsReply[]> =>
  rest.get(`/api/projects${queryToString(args)}`, config);

export const getProject = ({ id }: GetProjectArgs, config?: AxiosRequestConfig): AxiosReply<GetProjectReply> =>
  rest.get(`/api/project/${id}`, config);

export const saveProject = (args: SaveProjectArgs, config?: AxiosRequestConfig): AxiosReply<SaveProjectReply> =>
  rest.put(`/api/project/${args.id}`, args, config);
