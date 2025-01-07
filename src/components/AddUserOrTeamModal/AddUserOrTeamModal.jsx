import React, { useEffect, useState } from "react";
import { Input, List, Avatar, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getAllTeamsAndUsers } from "../../api/services/socialService";
import AppModal from "../AppModal/AppModal";

const AddUserOrTeamModal = ({ isVisible, onClose, onNext, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTeamsAndUsers, setAllTeamsAndUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchAllTeamsAndUser();
  }, []);

  const fetchAllTeamsAndUser = async () => {
    setLoading(true);
    try {
      setAllTeamsAndUsers(await getAllTeamsAndUsers());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemove = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.filter((userId) => userId !== id)
    );
  };

  const handleSubmit = () => {
    const selectedData = allTeamsAndUsers.filter((user) =>
      selectedUsers.includes(user._id)
    );
    onNext({ selectedUsers: selectedData });
  };

  const filteredList = allTeamsAndUsers.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppModal
      modalopen={isVisible}
      onClose={onClose}
      height="auto"
      width="40rem"
      customStyles={{
        overlay: { position: "fixed" },
        modal: { position: "absolute" },
      }}
    >
      <div style={{ padding: "1rem" }}>
        <h1
          style={{
            fontWeight: "600",
            fontSize: "1.25rem",
            marginBottom: "1rem",
          }}
        >
          Add a user or a team
        </h1>

        <Input
          placeholder="Search for a user/team"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: "1rem",
            borderRadius: "25px",
            padding: "0.75rem",
            fontSize: "1rem",
          }}
        />

        {selectedUsers.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {allTeamsAndUsers
              .filter((user) => selectedUsers.includes(user._id))
              .map((user) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "#e6f7ff",
                    borderRadius: "25px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    style={{ marginRight: "0.2rem" }}
                    size="small"
                  />

                  <span
                    key={user._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {user.name}
                    <CloseOutlined
                      onClick={() => handleRemove(user._id)}
                      style={{ cursor: "pointer", color: "#000" }}
                    />
                  </span>
                </div>
              ))}
          </div>
        )}

        <List
          dataSource={filteredList}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleSelect(item._id)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 1rem",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                backgroundColor: selectedUsers.includes(item._id)
                  ? "#f0f5ff"
                  : "transparent",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            >
              <Avatar
                src={item.avatar}
                style={{ marginRight: "1rem" }}
                size="small"
              />
              <div style={{ fontWeight: "500", fontSize: "1rem", flex: 1 }}>
                {item.name}
              </div>
            </List.Item>
          )}
          bordered={false}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        />

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <Button
            onClick={onClose}
            style={{
              flex: 1,
              borderRadius: "25px",
              padding: "1rem",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={selectedUsers.length === 0}
            onClick={handleSubmit}
            style={{
              flex: 1,
              borderRadius: "25px",
              padding: "1rem",
              backgroundColor: "#9CFC38",
              color: "#000",
              fontWeight: "600",
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </AppModal>
  );
};

export default AddUserOrTeamModal;
