import React, { useContext, useState } from "react";
import { MembersContext } from "../context/MembersContext";
import CheckIcon from "@rsuite/icons/Check";
import Edit from "@rsuite/icons/Edit";
import { IconButton } from "rsuite";
import Trash from "@rsuite/icons/Trash";

type MemberRowProps = {
  id: string;
  isChecked: boolean;
  handleCheck: (event: React.ChangeEvent) => void;
  editEntry: () => void;
  deleteEntry: () => void;
};

const MemberRow = ({
  id,
  isChecked,
  handleCheck,
  editEntry,
  deleteEntry,
}: MemberRowProps) => {
  const {
    membersState,
    toggleChecked,
    editMemberDetails,
    updateMember,
    deleteMember,
  } = useContext(MembersContext);
  let memberData = membersState[id];

  const [memberName, setMemberName] = useState(memberData?.name);
  const [memberEmail, setMemberEmail] = useState(memberData?.email);
  const [memberRole, setMemberRole] = useState(memberData?.role);

  if (memberData === undefined) {
    return <></>;
  }

  return (
    <tr
      style={{
        backgroundColor: `${memberData.isChecked ? "#dddddd" : "white"}`,
        padding: "4px",
        borderTop: "1px solid blue",
        borderBottom: "1px solid blue",
      }}
    >
      <td>
        <input
          type="checkbox"
          name={id}
          value={id}
          checked={memberData.isChecked}
          onChange={() => toggleChecked(id)}
        />
      </td>
      <td>
        {memberData.edit === true && (
          <input
            type="text"
            value={memberName}
            onChange={(event) => setMemberName(event?.target.value)}
          />
        )}
        {memberData.edit === false && (
          <label htmlFor={memberData.name}>{memberData.name}</label>
        )}
      </td>
      <td>
        {memberData.edit === true && (
          <input
            type="text"
            value={memberEmail}
            onChange={(event) => setMemberEmail(event.target.value)}
          />
        )}
        {memberData.edit === false && (
          <label htmlFor={memberData.name}>{memberData.email}</label>
        )}
      </td>
      <td>
        {memberData.edit === true && (
          <select
            value={memberRole}
            onChange={(event) => setMemberRole(event.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        )}
        {memberData.edit === false && (
          <label htmlFor={memberData.name}> {memberData.role} </label>
        )}
      </td>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {memberData.edit === false && (
            <IconButton
              icon={<Edit />}
              onClick={() => editMemberDetails(id)}
              color="blue"
              size="sm"
              circle
              style={{
                backgroundColor: "white",
                fontSize: "1rem",
                color: "blue",
              }}
            />
          )}
          {memberData.edit === true && (
            <IconButton
              onClick={() =>
                updateMember({
                  ...memberData,
                  name: memberName,
                  email: memberEmail,
                  role: memberRole,
                })
              }
              style={{
                backgroundColor: "white",
                fontSize: "1rem",
                color: "green",
              }}
            >
              <CheckIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => deleteMember(id)}
            style={{
              backgroundColor: "white",
              fontSize: "1rem",
              marginLeft: "4px",
              color: "red",
            }}
          >
            <Trash />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default MemberRow;
