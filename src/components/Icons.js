import Icon from '@mdi/react';
import {
  mdiTimelineClockOutline,
  mdiBellOutline,
  mdiBellBadgeOutline,
  mdiAccountOutline,
  mdiAccountAlertOutline,
  mdiAccountMultiplePlusOutline,
  mdiAccountMultipleRemoveOutline,
  mdiThumbUpOutline,
  mdiPencilOutline,
  mdiDelete,
  mdiDotsVertical,
  mdiCommentOutline,
  mdiPlus,
  mdiCogOutline,
  mdiAccountMultipleOutline,
  mdiAccountPlusOutline,
  mdiAccountClockOutline,
  mdiImagePlusOutline,
  mdiMessageOutline,
  mdiSend,
  mdiLogout,
  mdiMenu,
} from '@mdi/js';

export default function Icons() {
  const timeline = (
    <Icon
      path={mdiTimelineClockOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const notifications = (
    <Icon
      path={mdiBellOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const notificationAlert = (
    <Icon
      path={mdiBellBadgeOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const profile = (
    <Icon
      path={mdiAccountOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const friendList = (
    <Icon
      path={mdiAccountMultipleOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const friendRequest = (
    <Icon
      path={mdiAccountAlertOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const acceptFriendRequest = (
    <Icon
      path={mdiAccountMultiplePlusOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const declineFriendRequest = (
    <Icon
      path={mdiAccountMultipleRemoveOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const like = (
    <Icon
      path={mdiThumbUpOutline}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const edit = (
    <Icon
      path={mdiPencilOutline}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const deleteSVG = (
    <Icon
      path={mdiDelete}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const moreOptions = (
    <Icon
      path={mdiDotsVertical}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const comment = (
    <Icon
      path={mdiCommentOutline}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const bigComment = (
    <Icon
      path={mdiCommentOutline}
      size={2}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const newPost = (
    <Icon
      path={mdiPlus}
      size={2}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const settings = (
    <Icon
      path={mdiCogOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const sendFriendRequest = (
    <Icon
      path={mdiAccountPlusOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const friendRequestPending = (
    <Icon
      path={mdiAccountClockOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const addImage = (
    <Icon
      path={mdiImagePlusOutline}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const chat = (
    <Icon
      path={mdiMessageOutline}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const sendMessage = (
    <Icon
      path={mdiSend}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const logout = (
    <Icon
      path={mdiLogout}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const menuUp = (
    <Icon
      path={mdiMenu}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  const frPendingNotification = (
    <Icon
      path={mdiAccountClockOutline}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );
  return {
    // ..icons
    timeline,
    notifications,
    notificationAlert,
    friendList,
    friendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    like,
    edit,
    deleteSVG,
    moreOptions,
    comment,
    bigComment,
    newPost,
    settings,
    profile,
    sendFriendRequest,
    friendRequestPending,
    addImage,
    chat,
    sendMessage,
    logout,
    menuUp,
    frPendingNotification,
  };
}
