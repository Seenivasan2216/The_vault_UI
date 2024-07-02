import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Typography,
    } from '@material-tailwind/react';
  import { FormDialogProp } from '../../components/FormDialog';
  import { BaseSyntheticEvent, PropsWithChildren, useState } from 'react';
  import { User } from './User';
//   import { object, string, ValidationError } from 'yup';
  
  export interface UserFormDialogProp extends FormDialogProp<User> {}
  
  export function UserFormDialog(props: PropsWithChildren<UserFormDialogProp>) {
    type FormErrorType = {
      [key: string]: unknown;
    };
  
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<FormErrorType>({});
  
    const [formData, setFormData] = useState({
      ...props.data,
    });
  
    const [open] = useState(props.open);
  
    // const validationSchema = object({
    //   userId: string().required('User id is required'),
    //   email: string().email().nullable(),
    //   name: string().nullable(),
    //   status: string<'true' | 'false'>(),
    //   lastLoginDate: string().nullable(),
    // });
  
    async function submit() {
    //   await validationSchema
    //     .validate(formData, { abortEarly: false })
    //     .then(async () => {
    //       setFormError({});
    //       setLoading(true);
          
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       const newError: FormErrorType = {};
    //       if (e instanceof ValidationError) {
    //         e.inner.forEach((err) => {
    //           newError[err.path as string] = err.message;
    //         });
    //         setFormError(newError);
    //       }
    //     });
        await props.operationFn(formData).then(() => {
            setLoading(false);
          });
    }
  
    const cancel = () => props.cancelFn();
  
    function onInputChange(e: BaseSyntheticEvent) {
      const { name, value } = e.target;
      console.log(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    function onStatusChange(val: string | undefined) {
      setFormData({
        ...formData,
        status: val,
      });
    }
  
    return (
      <Dialog
        open={open}
        className="overflow-y-auto"
        dismiss={{ enabled: props.dismissable }}
      >
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            {props.header}
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <Card color="transparent" shadow={false}>
            <form className="w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  size="md"
                  placeholder="First Name"
                  label="First Name"
                  name="firstname"
                  value={formData.firstname}
                  error={'firstname' in formError}
                  onChange={onInputChange}
                  aria-errormessage="Please "
                />{' '}
                 {'FirstName' in formError && (
                      <Typography
                        variant="small"
                        color="gray"
                        className="mt-0 flex items-center gap-1 font-normal italic text-red-600"
                      >
                        {formError.userId as string}
                      </Typography>
                    )}
                <Input
                  size="md"
                  placeholder="Last Name"
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  error={'lastname' in formError}
                  onChange={onInputChange}
                  aria-errormessage="Please "
                />
                <Input
                  size="md"
                  placeholder="shortname@example.com.my"
                  label="Email"
                  name="email"
                  value={formData.email}
                  error={'email' in formError}
                  onChange={onInputChange}
                  aria-errormessage="Please "
                />
                <Input
                  size="md"
                  placeholder="Username"
                  label="Username"
                  name="username"
                  value={formData.username}
                  error={'username' in formError}
                  onChange={onInputChange}
                  aria-errormessage="Please "
                />
                <Input
                  size="md"
                  type='password'
                  placeholder="Password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  error={'password' in formError}
                  onChange={onInputChange}
                  aria-errormessage="Please "
                />
              </div>
            </form>
          </Card>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button onClick={cancel} variant={'text'} color="blue-gray">
            Cancel
          </Button>
          <Button onClick={submit} variant={'gradient'} loading={loading}>
            {props.operation}
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }
  