import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ServiceManagmentService } from './service.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { serviceFilterableFields } from './service.constant';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceManagmentService.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created successfully!',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceManagmentService.updateService(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully!',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceManagmentService.deleteService(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully!',
    data: result,
  });
});

const getServices = catchAsync(async (req: Request, res: Response) => {
  const filtersData = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ServiceManagmentService.getServices(
    filtersData,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully!',
    data: result,
  });
});

const getService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceManagmentService.getService(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully!',
    data: result,
  });
});

export const ServiceManagmentController = {
  createService,
  updateService,
  deleteService,
  getServices,
  getService,
};
