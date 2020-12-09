import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {ApiOptions, ApiResponse} from '../types';

export interface HelloSignFormTemplate {
  templateId: string;
  editUrl: string;
  expiresAt: number;
}

export interface SignatureRequestUrl {
  signUrl: string;
  editUrl: string;
  expiresAt: number;
}

export interface FormTemplate {
  id: number;
  hellosignId: string;
  title: string;
  createdByUserId: number;
  creationDate: string;
  active: boolean;
}

export interface SignatureRequest {
  id: number;
  hellosignSignatureId: string;
  hellosignSignatureRequestId: string;
  hellosignTemplateIds: string[];
  title: string;
  statusCode: string;
  driverId: number;
  createdByUserId: number;
  creationDate: string;
}

export interface CreateTemplateUrlRequest {
  file: Blob;
  title: string;
}

export interface CreateFormTemplateRequest {
  hellosignId: string;
  title: string;
}

export interface CreateSignatureRequestRequest {
  hellosignTemplateIds: string[];
  driverId: number;
}

export interface GetSignaturesQuery {
  statusCode: string;
}

export interface GetFormTemplateByIdQuery {
  formTemplateId: string;
}

export interface GetSignatureFileQuery {
  hellosignTemplateId: string;
}

// HelloSign
export function createTemplateUrl(
  request: CreateTemplateUrlRequest,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<HelloSignFormTemplate>> {
  const form = new FormData();
  form.append('file', request.file);
  form.append('title', request.title);
  return runApi({
    method: 'POST',
    urlRoot: 'eformsUrlRoot',
    route: '/api/1.0/vendors/hellosign/createTemplateUrl',
    notJson: true,
    apiOptions,
    requestOptions: {body: form}
  });
}

export function getTemplateEditUrl(
  formTemplateId: number,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<SignatureRequestUrl>> {
  return runApi({
    method: 'GET',
    urlRoot: 'eformsUrlRoot',
    route: `/api/1.0/vendors/hellosign/editTemplateUrl/${formTemplateId}`,
    apiOptions
  });
}

// Form Templates
export function getFormTemplates(
  apiOptions: ApiOptions = {}
): Request<ApiResponse<FormTemplate[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'eformsUrlRoot',
    route: '/api/1.0/formTemplates',
    apiOptions
  });
}

export function getFormTemplateById(
  query: GetFormTemplateByIdQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<FormTemplate>> {
  return runApi({
    method: 'GET',
    urlRoot: 'eformsUrlRoot',
    route: '/api/1.0/formTemplates',
    apiOptions,
    requestOptions: {query}
  });
}

export function createFormTemplates(
  request: CreateFormTemplateRequest,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<FormTemplate>> {
  return runApi({
    method: 'POST',
    urlRoot: 'eformsUrlRoot',
    route: '/api/1.0/formTemplates',
    apiOptions,
    requestOptions: {body: request}
  });
}

// Signature Requests
export function getSignatures(
  query: GetSignaturesQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<SignatureRequest[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'eformsUrlRoot',
    route: '/api/1.0/signatures',
    apiOptions,
    requestOptions: {query}
  });
}

export function createSignature(
  request: CreateSignatureRequestRequest,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<SignatureRequest>> {
  return runApi({
    method: 'POST',
    urlRoot: 'eformsUrlRoot',
    route: '/api/1.0/signatures',
    apiOptions,
    requestOptions: {body: request}
  });
}

export function getSignatureFile(
  signatureId: number,
  query: GetSignatureFileQuery,
  apiOptions: ApiOptions = {}
): Request<Blob> {
  return runApi({
    method: 'GET',
    urlRoot: 'eformsUrlRoot',
    route: `/api/1.0/signatures/${signatureId}/file`,
    apiOptions,
    requestOptions: {query, responseType: 'blob'}
  });
}

export function getSignatureSignUrl(
  signatureId: number,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<SignatureRequestUrl>> {
  return runApi({
    method: 'GET',
    urlRoot: 'eformsUrlRoot',
    route: `/api/1.0/signatures/${signatureId}/signUrl`,
    apiOptions
  });
}
