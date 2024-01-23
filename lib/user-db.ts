import { User } from "@/models/User";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

interface UserFilter {
  page?: number;
  limit?: number;
}

export async function getUsers(filter: UserFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).lean().exec();

    const results = users.length;

    return {
      users: users,
      page,
      limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}

export async function createUser(title: string) {
  try {
    await connectDB();

    const user = await User.create({ title });

    return {
      user,
    };
  } catch (error) {
    return { error };
  }
}

export async function getUser(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "User not found" };
    }

    const user = await User.findById(parsedId).lean().exec();
    if (user) {
      return {
        user,
      };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateUser(
  id: string,
  { title, completed }: { title?: string; completed?: boolean }
) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "User not found" };
    }

    const user = await User.findByIdAndUpdate(
      parsedId,
      { title, completed },
      { new: true }
    )
      .lean()
      .exec();

    if (user) {
      return {
        user,
      };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "User not found" };
    }

    const user = await User.findByIdAndDelete(parsedId).exec();

    if (user) {
      return {};
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}
