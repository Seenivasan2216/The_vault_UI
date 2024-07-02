export type FormDialogProp<T> = {
    header: string;
    dismissable: false;
    handlerFn: () => object;
    open: boolean;
    operation: 'Add' | 'Update';
    operationFn: (data: T) => Promise<unknown>;
    cancelFn: () => void;
    data: T;
  };
  