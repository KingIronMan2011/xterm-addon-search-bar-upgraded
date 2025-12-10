import { ITerminalAddon, Terminal } from '@xterm/xterm';
import { ISearchOptions, SearchAddon } from '@xterm/addon-search';
import './index.css';
export interface SearchBarOption extends ISearchOptions {
  searchAddon: SearchAddon;
}
export declare class SearchBarAddon implements ITerminalAddon {
  private readonly options;
  private terminal;
  private readonly searchAddon;
  private searchBarElement;
  private searchKey;
  constructor(options: Partial<SearchBarOption>);
  activate(terminal: Terminal): void;
  dispose(): void;
  show(): void;
  hidden(): void;
  private on;
  addNewStyle(newStyle: string): void;
}
