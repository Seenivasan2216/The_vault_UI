import React , {  PropsWithChildren, useEffect, useState  } from 'react';
import { getUsers, deleteUser, User, ListResponse, updateUser, createUser } from '../User/User'
import { DeleteDialog, DeleteDialogProps } from "../../components/DeleteForm";
import { PencilIcon, TrashIcon , UserPlusIcon } from "@heroicons/react/24/solid";
import { UserFormDialog, UserFormDialogProp } from '../User/UserFormDialog';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import AlertPopup from '../../components/validationDialog';
import { getSessionuser } from '../../service/session';
const sessionData = getSessionuser() || null;
export type UserListProp = {
    updateFn: (user: User) => void;
    deleteFn: (user: User) => void;
    searchText: string;
};

const UsersList: React.FC = (props: PropsWithChildren<UserListProp>) => {
    
  const [Users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const deleteDialogCancel = () => setDeleteDialog(false);
  const formDialogCancel = () => setFormDialog(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alerttitle, setAlertTitle] = useState('');

  const [deleteDialogProp, setDeleteDialogProp] = useState<DeleteDialogProps>({
    header: '',
    open: false,
    deleteFn: () => Promise.resolve(true),
    data: {},
    cancelFn: deleteDialogCancel,
  });
  const [formDialogProp, setFormDialogProp] = useState<UserFormDialogProp>({
    data: {
      firstname: '',
      userid: 0,
      lastname: '',
      email: '',
      username: '',
      password:'',
      createdat: new Date(),
      createdby: '',
      active: false
    },
    dismissable: false,
    handlerFn: async () => false,
    open: false,
    operation: 'Add',
    header: '',
    operationFn: () => Promise.resolve(),
    cancelFn: formDialogCancel
  });

  function deleteUserPopUp(user: User) {
    const newProp = { ...deleteDialogProp };
    newProp.header = `Are you sure to delete user (${user.username})`;
    newProp.data = user;
    newProp.deleteFn = deleteFn;
    setDeleteDialogProp(newProp);
    setDeleteDialog(true);
  }

  function editUserPopUp(user: User) {
    const newProp = { ...formDialogProp };
    newProp.data = user;
    newProp.header = `Update User (${user.username})`;
    newProp.operationFn = updateFn;
    newProp.operation = 'Update';
    setFormDialogProp(newProp);
    setFormDialog(true);
  }

  function addUserPopUp() {
    const newProp = { ...formDialogProp };
    newProp.data = {
      firstname: '',
      lastname: '',
      email: '',
      active: true,
      createdat: new Date(),
      userid: 0,
      username:'',
      password:'',
      createdby: ''
    };
    newProp.header = `Add User`;
    newProp.operationFn = createFn;
    newProp.operation = 'Add';
    setFormDialogProp(newProp);
    setFormDialog(true);
  }

  async function deleteFn(user: User){
    const response = await deleteUser(user.userid);
    console.log('DeleteFn', response);
    if (response.success){
      setDeleteDialog(false);
      setShowAlert(true);
      setAlertTitle('Delete User')
      setAlertMessage('User was Deletedr successfully.');
      await fetchUsers();
    }
    return true;
  }

  async function updateFn(user: User){
    const response = await updateUser(user);
    console.log('UpdateFn', response);
      if(response.success){
      setFormDialog(false);
      setShowAlert(true);
      setAlertTitle('Update User')
      setAlertMessage('User was Updated successfully.');
      await fetchUsers();
    }
    return true;
  }

  async function createFn(user: User){
    const response = await createUser(user);
    console.log('createFn', response);
    if (response.success){
      setFormDialog(false);
      setShowAlert(true);
      setAlertTitle('Add User')
      setAlertMessage('User was add successfully.');
      await fetchUsers();
    }
    return true;
  }

  async function fetchUsers() {
    try {
      const res : User[] = await getUsers();
      console.log("Fetchusers", res.response.data);
      //const user: User[] = [{"UserID":1,"FirstName":"abc","LastName":"aabc","Email":"abc@gmail.com","Active":true,"Username":"test","Password":"test","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"},{"UserID":3,"FirstName":"abc","LastName":"aabc","Email":"abc1@gmail.com","Active":true,"Username":"test1","Password":"test1","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"},{"UserID":4,"FirstName":"abc","LastName":"aabc","Email":"abc2@gmail.com","Active":true,"Username":"test2","Password":"test2","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"},{"UserID":5,"FirstName":"abc","LastName":"aabc","Email":"abc3@gmail.com","Active":true,"Username":"test3","Password":"test3","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"},{"UserID":6,"FirstName":"abc","LastName":"aabc","Email":"abc4@gmail.com","Active":true,"Username":"test4","Password":"test4","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"},{"UserID":7,"FirstName":"abc","LastName":"aabc","Email":"abc5@gmail.com","Active":true,"Username":"test5","Password":"test5","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"},{"UserID":8,"FirstName":"abc","LastName":"aabc","Email":"abc6@gmail.com","Active":true,"Username":"test6","Password":"test6","CreatedAt":"2024-06-14T19:51:32.677Z","CreatedBy":"abc","ModifyAt":"2024-06-14T19:51:32.677Z","ModifyBy":"abc"}];
      const user: User[] = res.response.data;
      setUsers(user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false)
    }
  }
  
  const handleCloseAlert = () => {
    setShowAlert(false);
  };


 useEffect(() => {
   fetchUsers();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

    const onChange = ({ target }: BaseSyntheticEvent) => setSearch(target.value);

    const TABLE_HEAD = ["Name", "Email", "Username", "Created At", "Created By", "Status" , ""];
    //const users = await getMethod('getUser');

    return (
        <>
      <Card className="">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm" onClick={addUserPopUp}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => (
            <tr key={user.userid} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.firstname} {user.lastname}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.username}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.createdat}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.createdby}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.active ?  'Active' : 'InActive'}
                </Typography>
              </td>
              <td className="p-4">
                <Tooltip content="Edit User">
                    <IconButton variant="text" onClick={() => {editUserPopUp(user)}}>
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Delete User">
                    <IconButton variant="text" onClick={() => deleteUserPopUp(user)}>
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
        </CardBody>
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50" placeholder={undefined} >
        {Users?.data.length && Users?.data.length > 0 && (
          <>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"  placeholder={undefined}            >
              Page {Users?.page} of {Users?.total_pages}
            </Typography>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 rounded-full"
                variant="text"
                size="sm"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1} placeholder={undefined}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>
              <Button
                className="flex items-center gap-2 rounded-full"
                variant="text"
                size="md"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === Users?.total_pages}
              placeholder={undefined}>
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardFooter> */}
      </Card>
      {deleteDialog && (
        <DeleteDialog
          header={deleteDialogProp.header}
          open={deleteDialog}
          cancelFn={deleteDialogProp.cancelFn}
          data={deleteDialogProp.data}
          deleteFn={deleteDialogProp.deleteFn}
        >
          The user will be permanently deleted from database.
        </DeleteDialog>
      )}
      {formDialog && (
        <UserFormDialog
          data={formDialogProp.data}
          header={formDialogProp.header}
          dismissable={formDialogProp.dismissable}
          handlerFn={formDialogProp.handlerFn}
          open={formDialog}
          operation={formDialogProp.operation}
          operationFn={formDialogProp.operationFn}
          cancelFn={formDialogProp.cancelFn}
        />
      )}
       <AlertPopup
        isOpen={showAlert}
        onClose={handleCloseAlert}
        title={alerttitle}
        message={alertMessage}
      />
    </>

    );
};
  
export default UsersList;