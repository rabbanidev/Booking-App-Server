import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';
import AllUser from '../users/users.model';

const addToCart = async (
  authUserId: string,
  payload: {
    serviceId: string;
  }
): Promise<ICart | null> => {
  const { serviceId } = payload;

  const exitCart = await Cart.findOne({
    user: authUserId,
    service: serviceId,
  });

  if (exitCart) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Service already added to cart!'
    );
  }

  const result = (
    await Cart.create({ user: authUserId, service: serviceId })
  ).populate([
    { path: 'service' },
    {
      path: 'user',
      populate: {
        path: 'user',
      },
    },
  ]);

  return result;
};

const myCarts = async (authUserId: string) => {
  const user = await AllUser.findById(authUserId).populate({
    path: 'user',
  });

  const result = await Cart.find({ user: authUserId })
    .populate([{ path: 'service' }])
    .select({ user: 0 });

  return {
    user: user?.user,
    cartItems: result,
  };
};

const removeFromCart = async (id: string): Promise<ICart | null> => {
  const result = await Cart.findByIdAndDelete(id);

  return result;
};

const singleCartItem = async (id: string): Promise<ICart | null> => {
  const result = await Cart.findById(id);
  return result;
};

export const CartService = {
  addToCart,
  myCarts,
  removeFromCart,
  singleCartItem,
};
