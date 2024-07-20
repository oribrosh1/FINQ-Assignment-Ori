import { Router } from "express";
import { getUsers } from "../services/users.service";
import { logger } from "../../lib/logger";
import { connection } from "../../lib/db";
import { User } from "../entities/user.entity";
const usersRouter = Router();

usersRouter.get("/saved-users", async (req, res) => {
  try {
    const users = await connection.manager.find(User);
    res.json(users.map(user => ({
      user: {
        login: {
          uuid: user.id
        },
        picture: {
          thumbnail: user.thumbnail
        },
        name: {
          title: user.title,
          first: user.firstName,
          last: user.lastName,
        },
        location: {
          country: user.country,
        },
        email: user.email,
        gender: user.gender,
        phone: user.phone
      }
    })));
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "failed to retrieve users" });
  }
});


usersRouter.post("/users/save-user", async (req, res) => {
  const userRepository = connection.getRepository(User);
  try {
    const userData = req.body.data;
    const id = req.body.userId;

    const user = new User();
    user.title = userData.title;
    user.firstName = userData.first;
    user.lastName = userData.last;

    user.gender = userData.gender;

    user.age = userData.age;
    user.birthYear = userData.birthYear;

    user.streetName = userData.streetName;
    user.streetNumber = userData.streetNumber;
    user.city = userData.city;
    user.state = userData.state;

    user.phone = userData.phone;
    user.email = userData.email;

    await userRepository.save(user);
    res.status(201).send(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
});

usersRouter.put("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { title, first, last } = req.body;

  const userRepository = connection.getRepository(User);

  try {
    // Perform the update operation with query builder
    const result = await userRepository.createQueryBuilder()
      .update(User)
      .set({ title: title, firstName: first, lastName: last })
      .where("id = :id", { id: userId })
      .execute();

    if (result.affected === 0) {
      return res.status(404).send("User not found");
    }

    // Fetch the updated user to return in response
    const updatedUser = await userRepository.findOne({ where: { id: userId } });
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});


usersRouter.delete("/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;  // Extracting the user ID from the URL parameter

  const userRepository = connection.getRepository(User);

  try {
    // Attempt to find the user first to ensure they exist
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send("User not found");  // Return an error if the user does not exist
    }

    // If the user exists, delete them
    await userRepository.remove(user);
    res.status(200).send({ message: "User deleted successfully" });  // Send a success response
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");  // Handle any other errors
  }
});

usersRouter.get("/users/:limit", async (req, res) => {
  try {
    let { limit } = req.params as {
      [x in string]: any;
    };

    const limitNumber = Number(limit);
    if (limitNumber && isNaN(limitNumber)) {
      res.status(400).json({ error: "Invalid parameters" });
    }
    const usersLimit = limitNumber || 10;
    console.log(usersLimit);
    const users = await getUsers();
    console.log(users);
    res.json(users);
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      error: "Failed to get users",
    });
  }
});
export { usersRouter };