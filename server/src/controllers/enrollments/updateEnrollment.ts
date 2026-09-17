import { Request, Response } from "express"
import { capitaliseStr, enrollmentConstraintMessage, formatDate, normalizeMobile } from "../../utils/global";
import getData from "../../utils/getData";
import { editEnrollment } from "../../gql/enrollments/mutations";

const updateEnrollment = async (req: Request, res: Response) => {
  const {id} = req?.params;
  const mobile_number = normalizeMobile(req?.body?.mobile_number)
  if (!mobile_number) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid 10-digit mobile number',
    })
  }
  const emailRaw = (req?.body?.email || '').trim()
  const children = req?.body?.children?.map((child: any)=>{
    return {
      dob: formatDate(child.dob), 
      gender: child.gender, 
      name: capitaliseStr(child.name),
      enrollment_id: id
    }
  })
  const variables = {
    ...req?.body,
    mobile_number,
    state: capitaliseStr(req?.body?.state),
    name: capitaliseStr(req?.body?.name),
    email: emailRaw ? emailRaw.toLowerCase() : null,
    children, 
    id
  }

  const data = await getData(editEnrollment, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: enrollmentConstraintMessage(data?.errors[0]?.message)
    })
  }
  if(data?.data?.update_enrollments?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Enrollment updated successfully'
    })
  }
  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })
}

export default updateEnrollment