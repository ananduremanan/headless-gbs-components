export type FileUploadProps = {
  showImagePreview?: boolean;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
  selectedFiles?: File[];
  accept?: string;
  fileCount?: number;
  disabled?: boolean;
  inputFileSize?: number;
  startUpload?: boolean;
  apiURL?: string;
  chunk_size?: number;
  uploadedFileIdArray?: (ids: string[]) => void;
  fileData?: File[];
};
