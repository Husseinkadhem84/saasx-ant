export enum ProjectType {
  AUTOMATION = 'AUTOMATION',
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  SAAS = 'SAAS',
}

export enum SnapshotReason {
  MANUAL_SAVE = 'MANUAL_SAVE',
  AI_EDIT = 'AI_EDIT',
  INITIAL_GENERATION = 'INITIAL_GENERATION',
  IMPORT = 'IMPORT',
  RESTORE = 'RESTORE',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export interface ProjectMetadata {
  name: string;
  description?: string;
  [key: string]: any;
}

export interface ProjectState {
  version: number;
  metadata: ProjectMetadata;
  pages: any[];
  screens: any[];
  workflows: any[];
  dataModels: any[];
  settings: Record<string, any>;
}

// Old Types preserved for frontend compatibility during transition
export interface GeneratedSystem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;
  descriptionAr: string;
  promptUsed?: string;
  nodes: WorkflowNode[];
  edges: any[];
  databaseTables: any[];
  n8nConfig: any;
  generatedUi: any;
  dockerComposeYaml: string;
  createdAt?: string;
}

export interface WorkflowEdge { id: string; source: string; target: string; animated?: boolean; label?: string; }

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

export type NodeType = 'ui' | 'ai' | 'database' | 'payment' | 'n8n' | 'trigger' | 'notification';
