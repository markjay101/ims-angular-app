export interface TableColumn {
  key: string;
  label: string;
  isVisible?: () => boolean;
}
