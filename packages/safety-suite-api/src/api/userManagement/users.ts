import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse, CustomerSpecificQuery} from '../../types';
import {InputUser, User, UserWithRoleNames} from './types';

/**
 * Get a list of users.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `User` objects.
 */
export const getUsers = (
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<UserWithRoleNames[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users',
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Get the current logged in user.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns The `User` object of the currently logged in user.
 */
export const getCurrentUser = (
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<User>> =>
  runApi({
    method: 'GET',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users/current',
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Invite a new user.
 * @param user `InputUser` object containing information about the user.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns The `User` object of the invited user.
 */
export const inviteUser = (
  user: InputUser,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<User>> =>
  runApi({
    method: 'POST',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users/invite',
    apiOptions,
    requestOptions: {
      body: user,
      query
    }
  });

/**
 * Update user data.
 * @param user `User` object to update.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns Updated `User` object.
 */
export const updateUser = (
  user: User,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<User>> =>
  runApi({
    method: 'PUT',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users',
    apiOptions,
    requestOptions: {
      body: user,
      query
    }
  });

/**
 * Resend an invite to a user.
 * @param user `User` object of the user to which the invite will be resent.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns Auth0 response.
 */
export const resendUserInvite = (
  user: User,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<string>> =>
  runApi({
    method: 'POST',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users/resendInvite',
    apiOptions,
    requestOptions: {
      body: user,
      query
    }
  });

/**
 * Sends a change password request for the currently logged in user.
 * @param apiOptions Optional options for runApi.
 * @returns Auth0 response.
 */
export const changePassword = (
  apiOptions?: ApiOptions
): Request<ApiResponse<string>> =>
  runApi({
    method: 'POST',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users/changePassword',
    apiOptions
  });
