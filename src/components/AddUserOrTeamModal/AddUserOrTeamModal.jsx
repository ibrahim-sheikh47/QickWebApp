import React, { useEffect, useState } from "react";
import { Modal, Button, Input, List, Checkbox, Typography } from "antd";
import { getAllTeamsAndUsers } from "../../api/services/socialService";

const { Title } = Typography;

const AddUserOrTeamModal = ({ isVisible, onClose, onNext, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTeamsAndUsers, setAllTeamsAndUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Filtered list based on the search term
  const filteredList = allTeamsAndUsers.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Handle selection of users/teams
  const handleSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = () => {
    const selectedData = allTeamsAndUsers.filter((user) =>
      selectedUsers.includes(user._id)
    );
    onNext({ selectedUsers: selectedData }); // Pass selected users to the next step
  };

  return (
    <Modal
      title="Add User or Team"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="next"
          type="primary"
          disabled={selectedUsers.length === 0}
          onClick={handleSubmit}
        >
          Next
        </Button>,
      ]}
    >
      <Input
        placeholder="Search users or teams"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <List
        dataSource={filteredList}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              checked={selectedUsers.includes(item._id)}
              onChange={() => handleSelect(item._id)}
            >
              {item.name}
            </Checkbox>
          </List.Item>
        )}
        bordered
        style={{ maxHeight: "300px", overflowY: "auto" }}
      />
      {selectedUsers.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <Title level={5}>Selected:</Title>
          {allTeamsAndUsers
            .filter((user) => selectedUsers.includes(user._id))
            .map((user) => (
              <span
                key={user._id}
                style={{
                  display: "inline-block",
                  margin: "0.25rem",
                  padding: "0.5rem",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                }}
              >
                {user.name}
              </span>
            ))}
        </div>
      )}
    </Modal>
  );
};

export default AddUserOrTeamModal;
