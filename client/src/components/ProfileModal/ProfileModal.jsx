import { Modal, useMantineTheme } from '@mantine/core';


function ProfileModal({modalOpened, setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={modalOpened}
      onClose={()=>{setModalOpened(false)}}
    >
      <form className="infoForm">
        <h3>Your Info</h3>
        <div>
            <input type="text" className="FormInput" name="firstname" placeholder="First Name" />
            <input type="text" className="FormInput" name="lastname" placeholder="Last Name" />
        </div>
        <div>
            <input type="text" className="FormInput" name="worksAt" placeholder="Works At" />
        </div>
        <div>
            <input type="text" className="FormInput" name="livesIn" placeholder="Lives In" />
            <input type="text" className="FormInput" name="country" placeholder="Country" />
        </div>
        <div>
            <input type="text" className="FormInput" name="relationshipStatus" placeholder="Relationship Status" />
        </div>
        <div>
            Profile Image
            <input type="file" name="profileImage" />
            Cover Image
            <input type="file" name="coverImage" />
        </div>
        <button className="Button SignUpButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal