import {
  Add,
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  ArrowUp2,
  Calendar,
  Call,
  CloseCircle,
  Copy,
  Danger,
  DocumentText,
  DocumentDownload,
  DocumentUpload,
  Edit2,
  Eye,
  EyeSlash,
  Filter,
  Gallery,
  Home2,
  InfoCircle,
  Location,
  Lock,
  Login,
  Logout,
  Message,
  More,
  Notification,
  Profile,
  SearchNormal1,
  Setting2,
  Share,
  Sms,
  TickCircle,
  Trash,
  Unlock,
  User,
  Wallet2,
  Warning2,
  HambergerMenu,
  Clock,
} from 'iconsax-react';
import type { BaseIconProps, IconName } from '../types';

export type WebIconProps = BaseIconProps & {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  role?: string;
  style?: React.CSSProperties;
};

/** Iconsax components have looser React types; cast through unknown for SDK compatibility. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconsaxWebIcon = React.ComponentType<any>;

const iconMap = {
  home: Home2,
  search: SearchNormal1,
  user: User,
  profile: Profile,
  settings: Setting2,
  notification: Notification,
  menu: HambergerMenu,
  more: More,
  close: CloseCircle,
  add: Add,
  edit: Edit2,
  trash: Trash,
  check: TickCircle,
  info: InfoCircle,
  warning: Warning2,
  danger: Danger,
  arrowLeft: ArrowLeft2,
  arrowRight: ArrowRight2,
  arrowUp: ArrowUp2,
  arrowDown: ArrowDown2,
  eye: Eye,
  eyeSlash: EyeSlash,
  lock: Lock,
  unlock: Unlock,
  logout: Logout,
  login: Login,
  message: Message,
  call: Call,
  calendar: Calendar,
  clock: Clock,
  document: DocumentText,
  download: DocumentDownload,
  upload: DocumentUpload,
  image: Gallery,
  location: Location,
  filter: Filter,
  wallet: Wallet2,
  copy: Copy,
  share: Share,
  sms: Sms,
} as unknown as Record<IconName, IconsaxWebIcon>;

export const icons = iconMap;

/** Named icon components (tree-shakeable). */
export const HomeIcon = iconMap.home;
export const SearchIcon = iconMap.search;
export const UserIcon = iconMap.user;
export const ProfileIcon = iconMap.profile;
export const SettingsIcon = iconMap.settings;
export const NotificationIcon = iconMap.notification;
export const MenuIcon = iconMap.menu;
export const MoreIcon = iconMap.more;
export const CloseIcon = iconMap.close;
export const AddIcon = iconMap.add;
export const EditIcon = iconMap.edit;
export const TrashIcon = iconMap.trash;
export const CheckIcon = iconMap.check;
export const InfoIcon = iconMap.info;
export const WarningIcon = iconMap.warning;
export const DangerIcon = iconMap.danger;
export const ArrowLeftIcon = iconMap.arrowLeft;
export const ArrowRightIcon = iconMap.arrowRight;
export const ArrowUpIcon = iconMap.arrowUp;
export const ArrowDownIcon = iconMap.arrowDown;
export const EyeIcon = iconMap.eye;
export const EyeSlashIcon = iconMap.eyeSlash;
export const LockIcon = iconMap.lock;
export const UnlockIcon = iconMap.unlock;
export const LogoutIcon = iconMap.logout;
export const LoginIcon = iconMap.login;
export const MessageIcon = iconMap.message;
export const CallIcon = iconMap.call;
export const CalendarIcon = iconMap.calendar;
export const ClockIcon = iconMap.clock;
export const DocumentIcon = iconMap.document;
export const DownloadIcon = iconMap.download;
export const UploadIcon = iconMap.upload;
export const ImageIcon = iconMap.image;
export const LocationIcon = iconMap.location;
export const FilterIcon = iconMap.filter;
export const WalletIcon = iconMap.wallet;
export const CopyIcon = iconMap.copy;
export const ShareIcon = iconMap.share;
export const SmsIcon = iconMap.sms;

export interface IconProps extends WebIconProps {
  name: IconName;
}

/**
 * Dynamic icon by name.
 * Prefer named exports (`HomeIcon`) when the icon is static for better tree-shaking.
 */
export function Icon({
  name,
  size = 24,
  color = 'currentColor',
  variant = 'Linear',
  className,
  style,
  onClick,
  role,
  title,
}: IconProps) {
  const Component = iconMap[name];
  if (!Component) return null;

  return (
    <Component
      size={size}
      color={color}
      variant={variant}
      className={className}
      style={style}
      onClick={onClick}
      role={role ?? (title ? 'img' : undefined)}
    />
  );
}

export type { IconName, IconVariant, BaseIconProps } from '../types';
export { ICON_NAMES, isIconName } from '../types';
