export = trie_prefix_tree;

declare namespace trie_prefix_tree {
    const prototype: {};

    function addWord(word: string): void;
    function removeWord(word: string): void;
    function isPrefix(prefix: string): boolean;
    function countPrefix(prefix: string): number;
    function getPrefix(prefix: string, sort?: boolean): string[];
}

