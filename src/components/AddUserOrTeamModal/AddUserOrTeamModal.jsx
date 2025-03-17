import React, { useEffect, useState } from "react";
import { Input, List, Avatar, Button, Tabs } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllTeamsAndUsers } from "../../api/services/socialService";
import AppModal from "../AppModal/AppModal";
import assets from "../../assets/assets";

const { TabPane } = Tabs;

const AddUserOrTeamModal = ({
  isVisible,
  onClose,
  onNext,
  selectedTeamData,
  selectedUsersData,
  setLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTeamsAndUsers, setAllTeamsAndUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("teams");
  const [selectedUsers, setSelectedUsers] = useState(
    selectedUsersData.map((u) => u._id)
  );
  const [selectedTeam, setSelectedTeam] = useState(selectedTeamData);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    fetchAllTeamsAndUser();
  }, []);

  useEffect(() => {
    if (allTeamsAndUsers.length > 0) {
      setUsersList(allTeamsAndUsers.filter((item) => item.isUser));
      setTeamsList(allTeamsAndUsers.filter((item) => !item.isUser));
    }
  }, [allTeamsAndUsers]);

  useEffect(() => {
    if (usersList.length > 0) {
      setFilteredUsers(
        usersList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [usersList, searchTerm]);

  useEffect(() => {
    if (teamsList.length > 0) {
      setFilteredTeams(
        teamsList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [teamsList, searchTerm]);

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
    const selectedData = usersList.filter((user) =>
      selectedUsers.includes(user._id)
    );
    onNext({ selectedTeam, selectedUsers: selectedData });
  };

  return (
    <AppModal
      modalopen={isVisible}
      onClose={onClose}
      height="auto"
      width="30rem"
      customStyles={{
        overlay: { position: "fixed" },
        modal: { position: "absolute", borderRadius: "30px" },
      }}
    >
      <div>
        <h1 className="text-[16px] mb-2 font-PJSbold">Add a user or a team</h1>

        <Input
          className="font-PJSmedium mb-2 rounded-full text-[12px]"
          placeholder="Search for a user/team"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suffix={<SearchOutlined />}
          style={{
            padding: "0.4rem 0.7rem",
          }}
        />

        {/* **Selected Users/Teams Section** */}
        {(selectedUsers.length > 0 || selectedTeam !== null) && (
          <div>
            {selectedTeam !== null && (
              <div
                key={selectedTeam._id}
                style={{
                  display: "inline-flex",
                  width: "fit-content",
                  alignItems: "center",
                  padding: "0.2rem 0.35rem",
                  backgroundColor: "#f4f4f4",
                  borderRadius: "25px",
                  borderWidth: "1px",
                }}
              >
                <Avatar src={selectedTeam.cover} size="small" />
                <span className="font-PJSbold text-[10px] mr-1">
                  <i>{`${selectedTeam.name} (T-${selectedTeam._id.substring(
                    selectedTeam._id.length - 2
                  )})${
                    selectedTeam.admins.length > 0
                      ? ` (Admin: ${
                          selectedTeam.admins[0].name
                        } ID-${selectedTeam.admins[0]._id.substring(
                          selectedTeam.admins[0]._id.length - 2
                        )})`
                      : ""
                  }`}</i>
                </span>

                <div className="flex justify-center items-center bg-lime w-[18px] h-[18px] rounded-full">
                  <img src={assets.checkblack} className="w-[12px] h-[12px]" />
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-1 mt-1 max-h-[4.5rem] overflow-x-auto">
              {usersList
                .filter((user) => selectedUsers.includes(user._id))
                .map((user) => (
                  <div
                    key={user._id}
                    className="gap-1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.2rem 0.35rem",
                      backgroundColor: "#f4f4f4",
                      borderRadius: "25px",
                      borderWidth: "1px",
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      style={{ marginRight: "0.2rem" }}
                      size="small"
                    />
                    <span className="font-PJSbold text-[10px]">
                      <i>{`${user.name} (ID-${user._id.substring(
                        user._id.length - 5
                      )})`}</i>
                    </span>

                    <div className="flex justify-center items-center bg-lime w-[18px] h-[18px] rounded-full">
                      <img
                        src={assets.checkblack}
                        className="w-[12px] h-[12px]"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* **Tabs for Users & Teams** */}
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* Teams Tab */}
          <TabPane tab="Teams" key="teams">
            <List
              dataSource={filteredTeams}
              renderItem={(item) => (
                <List.Item
                  key={item._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                    gap: "8px",
                  }}
                >
                  <Avatar src={item.cover} size="small" />
                  <div style={{ flex: 1 }}>
                    <div
                      className="font-PJSbold text-[12px] flex items-center"
                      style={{ flex: 1 }}
                    >
                      {`${item.name} (T-${item._id.substring(
                        item._id.length - 2
                      )})`}
                      <div className="font-PJSregular text-[9px] ml-1">{`(${item.members.length} members)`}</div>
                    </div>

                    <div className="font-PJSmedium text-[10px]">
                      {item.admins.length > 0
                        ? `Admin: ${
                            item.admins[0].name
                          } (ID-${item.admins[0]._id.substring(
                            item.admins[0]._id.length - 2
                          )})`
                        : ""}
                    </div>
                  </div>

                  <button
                    className={`h-6 w-6 border rounded-full flex justify-center items-center font-PJSregular text-white text-[12px] ${
                      selectedTeam && selectedTeam._id === item._id
                        ? "bg-blue"
                        : "bg-transparent"
                    }`}
                    onClick={() => setSelectedTeam(item)}
                  >
                    {selectedTeam && selectedTeam._id === item._id ? (
                      <img src={assets.checkwhite} />
                    ) : null}
                  </button>
                </List.Item>
              )}
              bordered={false}
              style={{ maxHeight: "300px", overflowY: "auto" }}
            />
          </TabPane>

          {/* Users Tab */}
          <TabPane tab="Users" key="users">
            <List
              dataSource={filteredUsers}
              renderItem={(item) => (
                <List.Item
                  key={item._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Avatar
                    src={item.avatar}
                    style={{ marginRight: "1rem" }}
                    size="small"
                  />
                  <div style={{ flex: 1 }}>
                    <div className="font-PJSbold text-[12px]">
                      {`${item.name} (ID-${item._id.substring(
                        item._id.length - 5
                      )})`}
                    </div>

                    <div className="font-PJSmedium text-[10px]">
                      {item.email}
                    </div>
                  </div>

                  <button
                    className={`h-6 w-6 border rounded-full flex justify-center items-center font-PJSregular text-white text-[12px] ${
                      selectedUsers.some((i) => i === item._id)
                        ? "bg-blue"
                        : "bg-transparent"
                    }`}
                    onClick={() => {
                      const isSelected = selectedUsers.some(
                        (i) => i === item._id
                      );
                      if (isSelected) {
                        handleRemove(item._id);
                      } else {
                        handleSelect(item._id);
                      }
                    }}
                  >
                    {selectedUsers.some((i) => i === item._id) ? (
                      <img src={assets.checkwhite} />
                    ) : null}
                  </button>
                </List.Item>
              )}
              bordered={false}
              style={{ maxHeight: "300px", overflowY: "auto" }}
            />
          </TabPane>
        </Tabs>

        {/* **Footer Buttons** */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <Button
            onClick={() => {
              setSelectedTeam(null);
              setSelectedUsers([]);
              setActiveTab("teams");
              onClose();
            }}
            style={{
              flex: 1,
              borderRadius: "25px",
              padding: "1.5rem",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={selectedUsers.length === 0 && selectedTeam === null}
            onClick={handleSubmit}
            style={{
              flex: 1,
              borderRadius: "25px",
              padding: "1.5rem",
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
