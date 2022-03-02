import { useEffect, useState } from 'react';

interface iUseDataState<KID> {
  initialValues: KID;
  newService: (values: KID) => Promise<KID | undefined>;
  updService: (values: KID) => Promise<KID | undefined>;
  delService: (keyId: string, recordData: any) => Promise<string | undefined>;
  readServices(): Promise<KID>;
}

export const useStateCollect = <KID>({
  initialValues,
  newService,
  updService,
  readServices,
  delService,
}: iUseDataState<KID>) => {
  const [snapService, setSnapService] = useState<KID[]>();
  const [recordEdit, setRecordEdit] = useState<KID>(initialValues);
  const [btnStatus, setBtnStatus] = useState('CREAR');

  useEffect(() => {
    readServices().then((collServ: any) => {
      let collService: any[] = [];
      // console.log(collServ);

      collServ.forEach((doc: KID) => {
        collService = [...collService, { ...doc }];
      });
      setSnapService([...collService]);
    });

    return () => {
      setSnapService([]);
    };
    // eslint-disable-next-line
  }, []);

  const buttonAction = async (values: KID, fileupload?: any) => {
    if (btnStatus === 'CREAR') {
      newService(values).then((newCollection: any) =>
        setSnapService((collSnap: any) => [{ ...values, id: newCollection.id }, ...collSnap!]),
      );
    } else if (btnStatus === 'ACTUALIZAR') {
      updService(values).then((editDoc: any) => {
        setSnapService((collServ) => [
          { ...editDoc! },
          ...collServ!.filter((item: any) => item.id !== editDoc!.id),
        ]);
      });
    }
    setRecordEdit({ ...initialValues });
    setBtnStatus('CREAR');
  };

  const buttonDelete = async (keyId: string) => {
    const recordData = snapService?.find((item: any) => item!.id === keyId);
    delService(keyId, recordData).then((keyValue) => {
      setSnapService((collServ) => [...collServ!.filter((item: any) => item!.id !== keyValue)]);
    });
  };

  const buttonReset = (dataInit: KID) => {
    setRecordEdit({ ...initialValues, ...dataInit });
    setBtnStatus('CREAR');
  };

  const buttonEdit = (dataEdit: KID) => {
    setBtnStatus('ACTUALIZAR');
    setRecordEdit({ ...dataEdit });
  };

  return {
    snapService,
    setSnapService,
    buttonAction,
    buttonReset,
    buttonEdit,
    buttonDelete,
    recordEdit,
    btnStatus,
  };
};
