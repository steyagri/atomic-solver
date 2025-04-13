// Type declarations for modules without their own type definitions

declare module 'react-native-html-to-pdf' {
  interface RNHTMLtoPDFOptions {
    html: string;
    fileName?: string;
    base64?: boolean;
    directory?: string;
    height?: number;
    width?: number;
    padding?: number;
  }

  interface RNHTMLtoPDFResult {
    filePath: string;
    base64?: string;
  }

  export function convert(options: RNHTMLtoPDFOptions): Promise<RNHTMLtoPDFResult>;
  
  const RNHTMLtoPDF: {
    convert: typeof convert;
  };
  
  export default RNHTMLtoPDF;
}

declare module 'react-native-share' {
  interface ShareOptions {
    title?: string;
    message?: string;
    url: string;
    type?: string;
    subject?: string;
    excludedActivityTypes?: string[];
    failOnCancel?: boolean;
    showAppsToView?: boolean;
  }

  export function open(options: ShareOptions): Promise<{ message: string }>;
  
  const Share: {
    open: typeof open;
    shareSingle: (options: ShareOptions & { social: string }) => Promise<{ message: string }>;
  };
  
  export default Share;
}

declare module 'react-native-fs' {
  // Common paths
  export const DocumentDirectoryPath: string;
  export const TemporaryDirectoryPath: string;
  export const CachesDirectoryPath: string;
  export const DownloadDirectoryPath: string;
  export const PicturesDirectoryPath: string;
  export const MainBundlePath: string;
  export const LibraryDirectoryPath: string;
  export const ExternalDirectoryPath: string;

  // File system methods
  export function writeFile(
    filepath: string,
    contents: string,
    encoding?: string
  ): Promise<void>;

  export function readFile(
    filepath: string,
    encoding?: string
  ): Promise<string>;

  export function unlink(filepath: string): Promise<void>;
  
  export function exists(filepath: string): Promise<boolean>;
  
  export function mkdir(filepath: string, options?: { NSURLIsExcludedFromBackupKey?: boolean }): Promise<void>;
  
  export function moveFile(
    filepath: string,
    destPath: string
  ): Promise<void>;
  
  export function copyFile(
    filepath: string,
    destPath: string
  ): Promise<void>;

  export interface StatResult {
    name: string;
    path: string;
    size: number;
    type: 'directory' | 'file';
    isFile: () => boolean;
    isDirectory: () => boolean;
  }

  export function stat(filepath: string): Promise<StatResult>;
} 