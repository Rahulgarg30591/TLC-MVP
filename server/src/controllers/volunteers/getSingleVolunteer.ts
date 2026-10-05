import { Request, Response } from "express"
import getData from "../../utils/getData";
import { VolunteerById } from "../../gql/volunteers/queries";

const getSingleVolunteer = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'User not found!',
    })
  }
  const data = await getData(VolunteerById, { id })

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(!data?.data?.users.length)
  {
    return res.status(404).json({
      status: 'error',
      message: 'User not found!'
    })
  }

  return res.status(200).json({
    status: 'success',
    message: 'Data fetched successfully!',
    user: data?.data?.users[0]
  })

}

export default getSingleVolunteer