import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
  } from '@material-tailwind/react';
  import { PropsWithChildren, useState } from 'react';
  
  export type DeleteDialogProps = {
    open: boolean;
    header: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteFn: (data: any) => Promise<boolean>; 
    cancelFn: () => void;
    data: unknown;
  };
  
  export function DeleteDialog(props: PropsWithChildren<DeleteDialogProps>) {
    const [open] = useState(props.open);
    const [loading, setLoading] = useState(false);
  
    const cancel = () => props.cancelFn();
  
    async function del() {
      console.log(props.data);
      setLoading(true);
      console.log(props);
      await props.deleteFn(props.data);
      setLoading(false);
    }
  
    return (
      <Dialog
        open={open}
        className="overflow-y-auto"
        dismiss={{ enabled: false }}
      >
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            {props.header}
          </Typography>
        </DialogHeader>
        <DialogBody divider>{props.children}</DialogBody>
        <DialogFooter className="space-x-2">
          <Button onClick={cancel} color="blue-gray" variant="text">
            Cancel
          </Button>
          <Button
            autoFocus={true}
            onClick={del}
            variant="gradient"
            loading={loading}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }
  