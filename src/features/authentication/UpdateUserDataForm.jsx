import { useUser } from "./useUser";
import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state
  const {
    user: {
      // email,
      user_metadata: { email: currentFullName },
    },
  } = useUser();

  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();
  const [email, setEmail] = useState(currentFullName);
  // const [fullName, setFullname] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  console.log(updateUser, isUpdating);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    updateUser(
      { email, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel(e) {
    // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
    setEmail(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isUpdating}
          id="email"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
