import React, { createContext, useEffect, useState } from "react";
import { getMembersData } from "../api";

type MembersContextProviderProps = {
  children: React.ReactNode;
};

export type ResourceObject = {
  id: string;
  name: string;
  email: string;
  role: string;
  isChecked: boolean;
  edit: boolean;
};

export type MembersState = {
  [id: string]: ResourceObject;
};

type MembersContextType = {
  membersArray: ResourceObject[];
  membersState: MembersState;
  toggleChecked: (id: string) => void;
  editMemberDetails: (id: string) => void;
  deleteMember: (id: string) => void;
  updateMember: (data: ResourceObject) => void;
  deleteSelected: () => void;
};

export const MembersContext = createContext({} as MembersContextType);

export const MembersContextProvider = ({
  children,
}: MembersContextProviderProps) => {
  const [membersArray, setMembersArray] = useState<ResourceObject[]>([]);
  const [membersState, setMembersState] = useState<MembersState>(
    {} as MembersState,
  );

  useEffect(() => {
    getMembersData()
      .then((res) => {
        let tempObject = res.data.reduce(
          (acc: MembersState, curr: ResourceObject) => {
            return {
              ...acc,
              [curr.id]: { ...curr, isChecked: false, edit: false },
            };
          },
          {},
        );

        setMembersState(tempObject);
        setMembersArray(Object.values(tempObject));
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleChecked = (id: string) => {
    let tempObj = membersState[id];
    setMembersState({
      ...membersState,
      [id]: { ...tempObj, isChecked: !tempObj.isChecked },
    });
    setMembersArray(Object.values(membersState));
  };

  const editMemberDetails = (id: string) => {
    let tempObj = membersState[id];
    setMembersState({
      ...membersState,
      [id]: { ...tempObj, edit: !tempObj.edit },
    });
    setMembersArray(Object.values(membersArray));
  };

  const deleteMember = (id: string) => {
    let filtered = membersArray.filter((obj) => obj.id !== id);
    setMembersArray(filtered);
    let temp = filtered.reduce((acc: MembersState, curr: ResourceObject) => {
      return { ...acc, [curr.id]: curr };
    }, {});
    setMembersState(temp);
  };

  const updateMember = (data: ResourceObject) => {
    setMembersState({
      ...membersState,
      [data.id]: { ...data, isChecked: false, edit: false },
    });
    setMembersArray(Object.values(membersState));
  };

  const deleteSelected = () => {
    let filtered = membersArray.filter((obj) => obj.isChecked !== true);
    setMembersArray(filtered);
    let temp = filtered.reduce((acc: MembersState, curr: ResourceObject) => {
      return { ...acc, [curr.id]: curr };
    }, {});
    setMembersState(temp);
  };

  return (
    <MembersContext.Provider
      value={{
        membersArray,
        membersState,
        toggleChecked,
        editMemberDetails,
        deleteMember,
        updateMember,
        deleteSelected,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};
