import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Loading from "../../Components/Loading";
import { Form,Button,Card } from "react-bootstrap";
import { useFormik } from "formik";
import { ApiKey, APIURL } from "../../Api/Api";
import axios from "axios";
const passwordChange = Yup.object().shape({
  password:Yup.string().min(6,"Password Should Be At Less 6").required("Password required"),
  rePassword:Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Re Password required")
});

const SideNewPassword = ({ currentUse,setCurrentUse }) => {
  const token = currentUse.hash;
    const notify = () => toast.error("password should be not as the old password.");
 
    const [loading,setLoading] = useState(false);
    const formik = useFormik({
      initialValues: {
        password:"",
        rePassword:"",
      },
      validationSchema: passwordChange ,
      onSubmit: async (values) => {
        console.log(values)
        setLoading(true)
        try{
          await axios.put(`${APIURL}/password_change/${token}`,
            {
              password:values.password
            },
            {
            headers:{
              Accept:"application/json",
              "x-api-key":ApiKey
            }
          });
          setCurrentUse({log:"login"})
        }catch(err){
          if(err.status === 410){
            notify();
            setLoading(false)

          }
        }finally{
          setLoading(false)
        }
    }
  });
  return (
    <div className="login-items-container overflow-auto mt-3">
          <div className="d-flex align-items-center flex-column position-relative">
           <ToastContainer position="top-center" closeButton={false} autoClose={2000} hideProgressBar={true} transition={Slide} />
            <span className="h5 fw-bold">Forgotten your password?</span>
            <span style={{fontSize:"12px"}}>We'll send you instructions by email so that you can reset it</span>
          </div>
            
          <div>
            {loading ? (
              <Loading />
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="small text-uppercase text-muted">New Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="New Password"
                        className="py-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="small text-uppercase text-muted">R Password</Form.Label>
                      <Form.Control
                        name="rePassword"
                        type="password"
                        placeholder="Enter r password"
                        className="py-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                        isInvalid={formik.touched.rePassword && !!formik.errors.rePassword}
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.rePassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 fw-bold text-uppercase"
                      style={{
                        background: 'linear-gradient(45deg, #e83e8c, #6f42c1)',
                        border: 'none',
                        letterSpacing: '1px',
                      }}
                      disabled={loading}
                    >
                      Reset
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
  )
}

export default SideNewPassword