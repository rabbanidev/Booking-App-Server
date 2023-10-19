import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CartService } from './cart.service';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.addToCart(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service added to cart successfully!',
    data: result,
  });
});

const myCarts = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.myCarts(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart items fteched successfully!',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.removeFromCart(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item delete successfully!',
    data: result,
  });
});

const singleCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.singleCartItem(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item fetched successfully!',
    data: result,
  });
});

export const CartController = {
  addToCart,
  myCarts,
  removeFromCart,
  singleCartItem,
};
