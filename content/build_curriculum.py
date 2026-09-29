import json
from pathlib import Path
TOPICS=[]
TESTS=[]
def topic(name,stage,summary,pattern,title,prompt,example,approach,code,time,space,pitfall,qa,tests,difficulty='Medium'):
    i=len(TOPICS)+1
    questions=[dict(id=f'{i}-1',title=title,kind='Coding',difficulty=difficulty,prompt=prompt,example=example,answer=approach,code=code.strip(),time=time,space=space,pitfall=pitfall)]
    for j,(q,a) in enumerate(qa,2):
        questions.append(dict(id=f'{i}-{j}',title=q,kind='Interview Q&A',difficulty='Easy' if j==2 else 'Medium',prompt=q,answer=a))
    TOPICS.append(dict(id=str(i),name=name,stage=stage,summary=summary,pattern=pattern,questions=questions))
    TESTS.append((name,code,tests))

topic('Complexity & analysis','Foundation','Big O, auxiliary space, recursion depth, amortized analysis.','Estimate time before choosing a solution.',
'Analyze pair counting','Return the number of index pairs (i, j) with i < j whose values sum to target. Count different index pairs separately. Input: a list of integers.','[1, 1, 2, 2], target=3 → 4',
'Keep a frequency map of earlier values. Each current value forms one pair with every earlier complement. Looking up before incrementing prevents pairing an element with itself. Compare this with checking all n(n−1)/2 pairs.',
'''def count_pairs(nums, target):
    seen = {}
    total = 0
    for value in nums:
        total += seen.get(target - value, 0)
        seen[value] = seen.get(value, 0) + 1
    return total''','O(n) expected','O(n)','Counting distinct value pairs is a different problem from counting index pairs.',
[('What do O, Ω, and Θ mean?','O is an asymptotic upper bound; Ω is a lower bound; Θ is a tight bound. They do not inherently mean worst, best, and average case. Specify the case and input size being analyzed.'),('Why is Python list append amortized O(1)?','Occasional resizing copies existing elements and costs O(n). Across a long sequence of appends, resizing work spreads over the operations, giving amortized O(1) per append. A single append can still cost O(n).')],
"assert count_pairs([1,1,2,2],3)==4; assert count_pairs([],3)==0; assert count_pairs([3,3,3],6)==3",'Easy')

topic('Arrays','Foundation','Traversal, in-place changes, subarrays, boundary handling.','Maintain a useful invariant while scanning.',
'Maximum subarray sum','Return the maximum sum of a nonempty contiguous subarray. Return None for an empty input. Values may be negative.','[-2,1,-3,4,-1,2,1,-5,4] → 6',
'Kadane’s algorithm tracks the best subarray ending at the current element. Either extend the previous subarray or start a new one. Track the best ending value seen anywhere.',
'''def max_subarray(nums):
    if not nums:
        return None
    ending = best = nums[0]
    for i in range(1, len(nums)):
        value = nums[i]
        ending = max(value, ending + value)
        best = max(best, ending)
    return best''','O(n)','O(1)','Starting best at zero incorrectly permits an empty subarray when all numbers are negative.',
[('What is the difference between a subarray and a subsequence?','A subarray is contiguous. A subsequence preserves order but can skip elements. For [1,2,3], [1,3] is a subsequence but not a subarray.'),('How do you move zeros without changing other values’ order?','Use a write pointer. Copy each nonzero to nums[write], advance write, and then fill the remaining suffix with zeros. This is stable, O(n) time, and O(1) auxiliary space.')],
"assert max_subarray([-2,1,-3,4,-1,2,1,-5,4])==6; assert max_subarray([-5,-2])==-2; assert max_subarray([]) is None",'Easy')

topic('Strings','Foundation','Character counts, normalization, palindromes, substring logic.','Clarify case, spaces, and character assumptions.',
'First non-repeating character','Return the index of the first character occurring once, or −1 if none exists. Matching is case-sensitive and spaces count as characters.','"leetcode" → 0; "aabb" → −1',
'Count all characters, then scan the original string to preserve order. The first character with frequency one gives the required index.',
'''def first_unique(text):
    counts = {}
    for char in text:
        counts[char] = counts.get(char, 0) + 1
    for i, char in enumerate(text):
        if counts[char] == 1:
            return i
    return -1''','O(n) expected','O(k), k distinct characters','A set records membership but loses the frequencies needed to distinguish one occurrence from several.',
[('How do you check whether two strings are anagrams?','After agreeing on normalization, compare their character-frequency maps. Equal lengths and equal counts imply anagrams. Hash counting takes expected O(n+m) time; sorting takes O(n log n + m log m).'),('Why can repeated string concatenation be expensive?','Strings are immutable. Repeatedly extending a string may copy accumulated content, giving quadratic work in a naive loop. Collect pieces in a list and use "".join(parts) for predictable linear assembly in total output size.')],
"assert first_unique('leetcode')==0; assert first_unique('aabb')==-1; assert first_unique('')==-1",'Easy')

topic('Hash maps & sets','Foundation','Frequency maps, membership, complements, grouping.','Trade extra memory for fast expected lookup.',
'Two sum indices','Return indices of two different elements that sum to target. Return None if no pair exists. Any valid pair is acceptable.','[2,7,11,15], target=9 → (0,1)',
'For each element, look for its complement in a map of earlier values to indices. Return when found; otherwise store the current value. This naturally uses different indices.',
'''def two_sum(nums, target):
    indices = {}
    for i, value in enumerate(nums):
        complement = target - value
        if complement in indices:
            return indices[complement], i
        indices[value] = i
    return None''','O(n) expected','O(n)','Insert after checking. Inserting first can match an element with itself.',
[('How does a hash collision differ from a duplicate key?','Different keys can map to the same bucket; this is a collision, resolved by the table implementation. Equal keys represent the same logical key, so assigning again replaces its value.'),('Are hash lookups always O(1)?','No. O(1) is an expected or amortized claim under suitable hashing and load management. Collisions can worsen performance. Also account for the cost of hashing and comparing long keys.')],
"assert two_sum([2,7,11,15],9)==(0,1); assert two_sum([3,3],6)==(0,1); assert two_sum([1],2) is None",'Easy')

topic('Two pointers','Core patterns','Converging pointers, read/write pointers, sorted input.','Move pointers using a provable ordering rule.',
'Pair sum in a sorted array','Given a nondecreasing integer array, return two different indices with the target sum, or None.','[1,2,4,6,8], target=10 → (1,4)',
'Place pointers at both ends. If the sum is too small, only increasing the left value can help. If too large, decrease the right value. Each move rules out one position.',
'''def sorted_pair(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return left, right
        if total < target:
            left += 1
        else:
            right -= 1
    return None''','O(n)','O(1)','This movement rule requires sorted input. Sorting first changes original indices.',
[('When should you use two pointers?','Look for sorted arrays, pairing extremes, palindrome checks, merging sorted sequences, or in-place compaction. Explain why moving a pointer cannot discard a valid better answer.'),('How do you remove duplicates from a sorted array in place?','Keep a write position for the next unique value. Scan left to right and copy only when the value differs from the last written one. Return the unique prefix length; elements after that length are irrelevant.')],
"assert sorted_pair([1,2,4,6,8],10)==(1,4); assert sorted_pair([],1) is None; assert sorted_pair([2,2],4)==(0,1)",'Easy')

topic('Sliding window','Core patterns','Fixed windows, variable windows, frequency constraints.','Grow right; shrink left until valid again.',
'Longest substring without repeated characters','Return the length of the longest contiguous substring containing no repeated character.','"abcabcbb" → 3',
'Store the last index of each character. When a repeated character is inside the window, move left past its earlier position. Never move left backward.',
'''def longest_unique(text):
    last = {}
    left = best = 0
    for right, char in enumerate(text):
        left = max(left, last.get(char, -1) + 1)
        last[char] = right
        best = max(best, right - left + 1)
    return best''','O(n) expected','O(k), distinct characters','Assigning left = last[char]+1 without max can move left backward, for example in "abba".',
[('Fixed window or variable window?','Use a fixed window when the length k is specified, updating outgoing and incoming elements. Use a variable window when a validity rule determines the length, such as at most k distinct values.'),('Can a shrinking window always solve subarray sum equals k?','No. With negative numbers, expanding can decrease the sum and shrinking can increase it, breaking the usual monotonic rule. Prefix sums with a frequency map handle arbitrary integers.')],
"assert longest_unique('abcabcbb')==3; assert longest_unique('abba')==2; assert longest_unique('')==0")

topic('Prefix sums','Core patterns','Range sums, cumulative counts, subarray identities.','A subarray sum equals the difference of two prefixes.',
'Count subarrays with sum k','Count nonempty contiguous subarrays whose sum equals k. Negative values and zeros are allowed.','[1,1,1], k=2 → 2',
'Let current be the running prefix sum. Every earlier prefix equal to current−k starts a valid subarray ending here. Seed prefix zero once to count subarrays starting at index zero.',
'''def subarray_sum(nums, k):
    frequencies = {0: 1}
    prefix = answer = 0
    for value in nums:
        prefix += value
        answer += frequencies.get(prefix - k, 0)
        frequencies[prefix] = frequencies.get(prefix, 0) + 1
    return answer''','O(n) expected','O(n)','A set is insufficient: equal prefix sums at different indices create different subarrays.',
[('How do you answer an inclusive range-sum query?','Build prefix with prefix[0]=0 and prefix[i+1]=prefix[i]+a[i]. Then sum(a[l:r+1]) is prefix[r+1]−prefix[l]. Preprocessing is O(n), and each valid query is O(1).'),('What if array values change between queries?','Plain prefix sums require rebuilding many suffix entries after an update. A Fenwick tree or segment tree supports point updates and range sums in O(log n).')],
"assert subarray_sum([1,1,1],2)==2; assert subarray_sum([0,0],0)==3; assert subarray_sum([1,-1,1],1)==3")

topic('Binary search','Core patterns','Bounds, monotonic predicates, search on answers.','Define the search interval and preserve its invariant.',
'First occurrence with lower bound','Given a sorted array, return the first index equal to target, or −1. Duplicates are allowed.','[1,2,2,2,4], target=2 → 1',
'Search the half-open interval [lo, hi) for the first value not less than target. Values before lo are smaller; potential lower-bound positions remain within the interval. Verify equality afterward.',
'''def first_occurrence(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo if lo < len(nums) and nums[lo] == target else -1''','O(log n)','O(1)','Mixing inclusive and half-open boundary rules can skip values or create infinite loops.',
[('What is binary search on the answer?','Search an ordered range of possible answers using a monotonic feasibility check. Example: find minimum processing speed that meets a deadline. Prove that once a speed works, every larger speed also works.'),('Why use hi = mid instead of mid−1 here?','The interval is half-open and mid may be the first valid position. Retaining mid as the exclusive upper bound of remaining smaller candidates allows the final boundary to converge to mid without skipping it.')],
"assert first_occurrence([1,2,2,2,4],2)==1; assert first_occurrence([],2)==-1; assert first_occurrence([1,3],2)==-1",'Easy')

topic('Sorting','Foundation','Stability, comparators, merge sort, quicksort, counting sort.','Choose by constraints, stability, and memory.',
'Merge two sorted arrays','Return a sorted list containing all values of two nondecreasing lists. Preserve duplicates.','[1,3,5] and [2,3,6] → [1,2,3,3,5,6]',
'Compare the current values from both inputs and append the smaller one. On ties choose the left input first for stability. Append the unconsumed suffixes.',
'''def merge_sorted(a, b):
    i = j = 0
    result = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i])
            i += 1
        else:
            result.append(b[j])
            j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result''','O(n + m)','O(n + m), including output and temporary slices','A strict less-than tie rule may reverse equal-key records across the two inputs.',
[('What is a stable sort?','Equal-key records keep their relative input order. Stability is useful when sorting records by multiple keys in successive passes. Standard merge sort can be stable; ordinary in-place quicksort is usually not.'),('When can sorting beat the comparison lower bound?','Ω(n log n) applies to general comparison sorting. Counting sort exploits a bounded integer key range and can run in O(n+k) time using O(k) counting space. Radix sort exploits digit structure under suitable assumptions.')],
"assert merge_sorted([1,3,5],[2,3,6])==[1,2,3,3,5,6]; assert merge_sorted([],[])==[]; assert merge_sorted([1],[])==[1]",'Easy')

topic('Linked lists','Data structures','Pointer updates, reversal, fast/slow pointers, cycles.','Save the next link before overwriting it.',
'Detect a linked-list cycle','Given head of a singly linked list, return True if following next pointers eventually revisits a node. Compare node identity, not value.','1 → 2 → 3 → node 2 gives True',
'Floyd’s algorithm moves slow one link and fast two links. In a cycle their relative distance changes by one each step, so they meet. Without a cycle, fast reaches None.',
'''class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

def has_cycle(head):
    slow = fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False''','O(n)','O(1)','Two different nodes may hold the same value. Equality of values does not prove a cycle.',
[('How do you find the middle node?','Move slow one step and fast two steps until fast cannot advance. Slow ends at the middle; with the common loop it returns the second of two middle nodes for an even-length list.'),('How do you find the start of a cycle?','After slow and fast meet, move one pointer to head. Advance both one step at a time. Their next meeting is the cycle entry; this follows from the distances traveled before and within the cycle.')],
"a=Node(1); b=Node(2); a.next=b; assert not has_cycle(a); b.next=a; assert has_cycle(a); assert not has_cycle(None)",'Easy')

topic('Stacks','Data structures','Balanced delimiters, expression parsing, undo.','Store unresolved work in last-in-first-out order.',
'Validate brackets','A string contains only (), [], and {}. Return whether every opening bracket is correctly matched and nested. The empty string is valid.','"([]{})" → True; "([)]" → False',
'Push opening brackets. For each closing bracket, require a nonempty stack with the matching opener at the top. At the end the stack must be empty.',
'''def valid_brackets(text):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for char in text:
        if char in '([{':
            stack.append(char)
        elif char not in pairs or not stack or stack.pop() != pairs[char]:
            return False
    return not stack''','O(n)','O(n)','Balanced counts alone do not guarantee correct nesting; "([)]" has equal counts but is invalid.',
[('Why does a stack fit nested expressions?','The most recently opened structure must close first. This is exactly last-in-first-out behavior, so the stack top represents the next unresolved opening delimiter.'),('How can a stack return the minimum in O(1)?','Store each pushed value together with the minimum up to that depth, or maintain a second minimum stack including duplicates. Push, pop, top, and minimum are O(1), using O(n) space.')],
"assert valid_brackets('([]{})'); assert not valid_brackets('([)]'); assert valid_brackets(''); assert not valid_brackets(']')",'Easy')

topic('Queues & deques','Data structures','FIFO processing, BFS queues, both-end operations.','Process items in arrival order.',
'Implement a queue using two stacks','Support push(value) and pop() in FIFO order. Raise IndexError when popping an empty queue.','push(10), push(20), pop() → 10',
'New values enter incoming. To pop, use outgoing; if it is empty, transfer all incoming values to outgoing, reversing order. Each element transfers at most once.',
'''class TwoStackQueue:
    def __init__(self):
        self.incoming = []
        self.outgoing = []

    def push(self, value):
        self.incoming.append(value)

    def pop(self):
        if not self.outgoing:
            while self.incoming:
                self.outgoing.append(self.incoming.pop())
        if not self.outgoing:
            raise IndexError('empty queue')
        return self.outgoing.pop()''','Amortized O(1) per operation; worst-case O(n) pop','O(n)','Transfer only when outgoing is empty. Transferring on every pop can break ordering and waste work.',
[('Why use deque instead of list.pop(0) for a queue?','Removing the first list element shifts remaining elements and takes O(n). collections.deque supports append and popleft in O(1) time.'),('Queue, deque, or priority queue?','A queue removes the oldest item. A deque permits insertion and removal at both ends. A priority queue removes the item with highest or lowest priority, independently of arrival order.')],
"q=TwoStackQueue(); q.push(10); q.push(20); assert q.pop()==10; q.push(30); assert q.pop()==20; assert q.pop()==30")

topic('Recursion & divide-and-conquer','Core patterns','Base cases, recurrence relations, call-stack space.','Make progress toward a smaller instance.',
'Fast integer power','Compute x raised to nonnegative integer n using exponentiation by squaring. Use 0^0 = 1 by convention.','x=2, n=10 → 1024',
'Compute the half power once. Square it for even n and multiply by x once more for odd n. Each call halves n, so recursion depth is logarithmic.',
'''def fast_power(x, n):
    if n < 0:
        raise ValueError('n must be nonnegative')
    if n == 0:
        return 1
    half = fast_power(x, n // 2)
    return half * half if n % 2 == 0 else half * half * x''','O(log n) multiplications for n ≥ 1','O(log n) call stack','Calling fast_power twice for the same half repeats work. Large-integer multiplication itself is not constant time.',
[('What must every recursive solution establish?','A base case, progress toward it, and a rule combining smaller answers. State the invariant for each call and include recursion stack usage in the space analysis.'),('How do you reason about T(n)=2T(n/2)+O(n)?','Each level does O(n) total merging work and there are O(log n) levels, giving O(n log n). This is the standard balanced merge-sort recurrence.')],
"assert fast_power(2,10)==1024; assert fast_power(3,0)==1; assert fast_power(-2,3)==-8",'Easy')

topic('Backtracking','Core patterns','Subsets, permutations, pruning, choose/explore/undo.','Explore candidates while restoring shared state.',
'Generate all subsets','Given distinct integers, return all subsets in any order. Include the empty subset.','[1,2] → [[],[1],[1,2],[2]]',
'At each recursion level, record the current subset and try every later element. The start index avoids reusing earlier choices and eliminates duplicate subset orderings.',
'''def subsets(nums):
    result, path = [], []
    def visit(start):
        result.append(path.copy())
        for i in range(start, len(nums)):
            path.append(nums[i])
            visit(i + 1)
            path.pop()
    visit(0)
    return result''','O(n · 2^n), including copying outputs','O(n) auxiliary; O(n · 2^n) output','Appending path itself aliases the mutable list. Append path.copy() to preserve each answer.',
[('How is backtracking different from ordinary recursion?','Backtracking recursively explores alternative choices and undoes each choice before trying the next. Recursion is the broader technique; not all recursion searches alternatives.'),('How do you avoid duplicate subsets when input contains duplicates?','Sort the values. At a given recursion depth, skip nums[i] when i>start and nums[i]==nums[i−1]. Equal values may still be chosen at deeper levels, allowing subsets with repeated elements.')],
"assert sorted(subsets([1,2]))==sorted([[],[1],[2],[1,2]]); assert subsets([])==[[]]")

topic('Binary trees','Data structures','Traversals, height, diameter, level order, LCA.','Separate each node’s local work from subtree answers.',
'Level-order traversal','Return node values grouped by level from left to right. Return [] for an empty tree.','Root 1 with children 2 and 3 → [[1],[2,3]]',
'Use a queue. Capture its length at the start of each level, then process exactly that many nodes. Children appended during processing belong to the next level.',
'''from collections import deque
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value, self.left, self.right = value, left, right

def level_order(root):
    if root is None:
        return []
    queue, result = deque([root]), []
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.value)
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        result.append(level)
    return result''','O(n)','O(w) auxiliary queue; O(n) output, w maximum width','Do not let the loop boundary grow as children are enqueued, or several levels can merge into one.',
[('Preorder, inorder, or postorder?','Preorder visits node-left-right, useful for copying structure. Inorder visits left-node-right and yields sorted keys in a BST. Postorder visits left-right-node, useful when a parent needs completed child results.'),('How do you compute a tree’s diameter efficiently?','A postorder function returns subtree height. At each node, the longest path through it has left_height+right_height edges. Maintain the maximum globally while returning 1+max(left_height,right_height), for O(n) time.')],
"assert level_order(TreeNode(1,TreeNode(2),TreeNode(3)))==[[1],[2,3]]; assert level_order(None)==[]")

topic('BSTs & balanced trees','Data structures','Ordering bounds, predecessor/successor, balanced height.','Validate whole-subtree constraints, not only children.',
'Validate a strict binary search tree','Return whether every node is strictly greater than all keys in its left subtree and strictly less than all keys in its right subtree. Duplicates are invalid.','Root 5, left 1, right 7 with left child 4 → False',
'Carry exclusive lower and upper bounds downward. Moving left tightens the upper bound; moving right tightens the lower bound. Every node must satisfy both inherited bounds.',
'''class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value, self.left, self.right = value, left, right

def valid_bst(root):
    def visit(node, low, high):
        if node is None:
            return True
        if not low < node.value < high:
            return False
        return (visit(node.left, low, node.value)
                and visit(node.right, node.value, high))
    return visit(root, float('-inf'), float('inf'))''','O(n)','O(h) recursion stack','Checking only node.left < node < node.right misses violations deeper in a subtree.',
[('Why can an ordinary BST search take O(n)?','Sorted insertions may produce a chain of height n. Search costs O(h), not automatically O(log n). AVL and red-black trees maintain height O(log n) using balancing rules and rotations.'),('How do AVL and red-black trees differ?','AVL trees keep subtree heights within one at every node and are more strictly balanced. Red-black trees maintain color and black-height rules with looser balance. Both guarantee logarithmic search and updates; rotation and bookkeeping trade-offs differ.')],
"assert valid_bst(TreeNode(2,TreeNode(1),TreeNode(3))); assert not valid_bst(TreeNode(5,TreeNode(1),TreeNode(7,TreeNode(4)))); assert not valid_bst(TreeNode(2,TreeNode(2)))")

topic('Heaps & priority queues','Data structures','Top k, streaming values, scheduling, k-way merge.','Keep only the candidates you need.',
'Kth largest value','Return the kth largest value, counting duplicates as separate elements. Require 1 ≤ k ≤ len(nums).','[3,2,1,5,6,4], k=2 → 5',
'Keep a min-heap of the largest k values seen. When a new value is larger than the root, replace the root. At the end, the smallest among those k values is the kth largest overall.',
'''import heapq

def kth_largest(nums, k):
    if not 1 <= k <= len(nums):
        raise ValueError('invalid k')
    heap = nums[:k]
    heapq.heapify(heap)
    for i in range(k, len(nums)):
        if nums[i] > heap[0]:
            heapq.heapreplace(heap, nums[i])
    return heap[0]''','O(n log(k+1))','O(k)','A min-heap of all values gives the global minimum at the root, not the kth largest directly.',
[('Why is heap construction O(n)?','Most nodes are near leaves and need little sifting. Summing work over node heights gives a convergent weighted series times n. Inserting n values one by one instead costs O(n log n).'),('Heap or fully sorted array for a stream?','A heap supports updates and extremum extraction in O(log n), with O(1) access to its extremum. A sorted array supports binary search but insertion may shift O(n) elements. Choose based on required operations.')],
"assert kth_largest([3,2,1,5,6,4],2)==5; assert kth_largest([2,2,1],2)==2; assert kth_largest([7],1)==7")

topic('Tries','Data structures','Prefix trees, word boundaries, autocomplete.','Share common prefixes instead of repeating them.',
'Implement word and prefix search','Support insert(word), search(word), and starts_with(prefix) for Python strings. Empty strings are supported.','Insert "apple": search("app") → False; starts_with("app") → True',
'Each trie node maps characters to child nodes. A dedicated end marker distinguishes a stored word from a mere prefix. Walking a string takes one transition per character.',
'''class Trie:
    END = object()
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for char in word:
            node = node.setdefault(char, {})
        node[self.END] = True

    def _walk(self, text):
        node = self.root
        for char in text:
            if char not in node:
                return None
            node = node[char]
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and self.END in node

    def starts_with(self, prefix):
        return self._walk(prefix) is not None''','O(L) expected per operation','O(total stored characters)','A successful prefix walk does not imply the whole word was inserted; check the end marker.',
[('When is a trie useful compared with a hash set?','Both can test full-word membership. Tries additionally support prefix traversal and lexicographic exploration naturally. They can consume substantial memory because each node stores links.'),('How would you add autocomplete suggestions?','Walk to the prefix node, then DFS its descendants, collecting words at end markers. Stop after the requested number of suggestions. For ranked suggestions, store or compute ranking information; plain DFS does not imply popularity order.')],
"t=Trie(); t.insert('apple'); assert t.search('apple'); assert not t.search('app'); assert t.starts_with('app'); t.insert(''); assert t.search('')")

topic('Graph traversal','Graphs','Adjacency lists, BFS, DFS, connected components.','Mark visited and define directed versus undirected edges.',
'Count connected components','Given n vertices numbered 0..n−1 and undirected edges with valid endpoints, return the number of connected components. Include isolated vertices.','n=5, edges=[(0,1),(1,2),(3,4)] → 2',
'Build adjacency lists. For each unvisited vertex, start a DFS and mark its reachable component. Each new DFS start increases the component count.',
'''def components(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    seen = set()
    count = 0
    for start in range(n):
        if start in seen:
            continue
        count += 1
        seen.add(start)
        stack = [start]
        while stack:
            node = stack.pop()
            for neighbor in graph[node]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    stack.append(neighbor)
    return count''','O(V + E)','O(V + E), including adjacency storage','Starting DFS from only vertex zero misses disconnected components.',
[('When does BFS find shortest paths?','BFS finds minimum-edge-count paths in an unweighted graph, or when every edge has the same positive weight. Arbitrary nonnegative weights require an algorithm such as Dijkstra.'),('How do you detect a graph cycle?','In undirected DFS, a visited neighbor other than the parent signals a cycle in a simple graph. In directed DFS, use states unvisited/active/finished; an edge to an active node signals a directed cycle. Multigraphs need edge identity handling.')],
"assert components(5,[(0,1),(1,2),(3,4)])==2; assert components(3,[])==3; assert components(0,[])==0")

topic('Topological ordering','Graphs','DAGs, indegrees, dependencies, cycle detection.','Process only nodes whose prerequisites are finished.',
'Order course prerequisites','Given n courses and pairs (course, prerequisite), return a valid course order, or [] if a cycle prevents completion. Endpoints are valid course IDs.','n=3, [(1,0),(2,1)] → [0,1,2]',
'Kahn’s algorithm enqueues all zero-indegree courses. Remove one, append it to the order, and reduce its dependents’ indegrees. If fewer than n are processed, a cycle exists.',
'''from collections import deque

def course_order(n, prerequisites):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for course, prerequisite in prerequisites:
        graph[prerequisite].append(course)
        indegree[course] += 1
    queue = deque(i for i in range(n) if indegree[i] == 0)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    return order if len(order) == n else []''','O(V + E)','O(V + E)','An edge must go from prerequisite to course, not the reverse.',
[('Does every directed graph have a topological order?','No. A topological order exists exactly when the directed graph is acyclic. A cycle would require some vertex to precede itself through its dependency chain.'),('Is a topological order unique?','Not necessarily. In Kahn’s algorithm, multiple available zero-indegree vertices allow different valid choices. A unique order has only one available choice at every step.')],
"assert course_order(3,[(1,0),(2,1)])==[0,1,2]; assert course_order(2,[(1,0),(0,1)])==[]")

topic('Shortest paths','Graphs','Dijkstra, relaxation, stale heap entries, negative edges.','Choose the algorithm according to edge weights.',
'Dijkstra’s shortest distances','Given n vertices, directed edges (u,v,w) with nonnegative weights, and a valid start, return distances. Unreachable vertices have float("inf").','n=3, [(0,1,4),(0,2,1),(2,1,2)], start=0 → [0,3,1]',
'Keep tentative distances and pop the smallest from a heap. Relax outgoing edges and push improved distances. Skip entries whose distance no longer matches the best known value.',
'''import heapq

def dijkstra(n, edges, start):
    graph = [[] for _ in range(n)]
    for u, v, weight in edges:
        if weight < 0:
            raise ValueError('negative edge')
        graph[u].append((v, weight))
    distance = [float('inf')] * n
    distance[start] = 0
    heap = [(0, start)]
    while heap:
        current, node = heapq.heappop(heap)
        if current != distance[node]:
            continue
        for neighbor, weight in graph[node]:
            candidate = current + weight
            if candidate < distance[neighbor]:
                distance[neighbor] = candidate
                heapq.heappush(heap, (candidate, neighbor))
    return distance''','O(V + E log(E+1)) with lazy heap entries','O(V + E)','Dijkstra’s correctness requires nonnegative weights; do not use it unchanged for negative edges.',
[('When do you use Bellman–Ford or Floyd–Warshall?','Bellman–Ford solves single-source shortest paths with negative edges and detects reachable negative cycles, in O(VE). Floyd–Warshall computes all-pairs distances in O(V³) time and O(V²) space, useful for smaller dense graphs.'),('Why skip stale heap entries?','The same vertex can be pushed after several improvements. An old larger-distance entry is redundant. Skipping it avoids rescanning outgoing edges unnecessarily; the current distance array is the authority.')],
"assert dijkstra(3,[(0,1,4),(0,2,1),(2,1,2)],0)==[0,3,1]; assert dijkstra(2,[],0)==[0,float('inf')]")

topic('Disjoint sets & MST','Graphs','Union-find, path compression, union by size, Kruskal.','Merge components without exploring every path again.',
'Minimum spanning tree cost','Given n≥1 vertices and undirected weighted edges, return MST total cost or None if disconnected. Negative weights are allowed.','n=3, [(0,1,4),(0,2,1),(1,2,2)] → 3',
'Kruskal sorts edges by weight. Use a disjoint-set structure to accept an edge only when its endpoints belong to different components. Stop after n−1 accepted edges.',
'''def mst_cost(n, edges):
    parent = list(range(n))
    size = [1] * n
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total = used = 0
    for u, v, weight in sorted(edges, key=lambda e: e[2]):
        a, b = find(u), find(v)
        if a == b:
            continue
        if size[a] < size[b]:
            a, b = b, a
        parent[b] = a
        size[a] += size[b]
        total += weight
        used += 1
        if used == n - 1:
            break
    return total if used == n - 1 else None''','O(V + E log(E+1))','O(V + E), including sorted edge copy','A minimum spanning tree minimizes total connecting-edge weight; it is not a shortest-path tree from a source.',
[('What do path compression and union by size achieve?','Compression shortens parent paths during find. Union by size attaches the smaller component beneath the larger. Together they give amortized O(α(n)) per operation, where α grows extremely slowly.'),('What is the MST cut property?','For any partition of vertices into two sets, a minimum-weight edge crossing the cut is safe to include in some MST. This supports the greedy correctness of Kruskal and Prim.')],
"assert mst_cost(3,[(0,1,4),(0,2,1),(1,2,2)])==3; assert mst_cost(3,[(0,1,1)]) is None; assert mst_cost(1,[])==0")

topic('Greedy algorithms','Core patterns','Local choice, exchange arguments, feasibility.','Prove a local choice preserves an optimal answer.',
'Maximum non-overlapping activities','Given activities (start,end) with start<end, return the maximum number you can attend. An activity starting exactly when another ends is compatible.','[(1,3),(2,4),(3,5),(5,7)] → 3',
'Sort by finish time. Choose the earliest-finishing compatible activity repeatedly. Replacing an optimal solution’s first choice with an earlier-finishing one cannot reduce remaining opportunities.',
'''def max_activities(intervals):
    last_end = float('-inf')
    count = 0
    for start, end in sorted(intervals, key=lambda p: p[1]):
        if start >= last_end:
            count += 1
            last_end = end
    return count''','O(n log n)','O(n), sorting copy','Sorting by earliest start or shortest duration does not generally maximize the count.',
[('How do you justify a greedy algorithm in an interview?','State the exact greedy choice and prove it is safe, often with an exchange argument or stays-ahead argument. A plausible rule and successful examples are not a correctness proof.'),('Why does greedy fail for general coin change?','With coins [1,3,4] and amount 6, taking the largest first gives 4+1+1, three coins. The optimum is 3+3, two coins. General denominations require a method such as dynamic programming.')],
"assert max_activities([(1,3),(2,4),(3,5),(5,7)])==3; assert max_activities([])==0")

topic('Intervals','Core patterns','Merging, overlap rules, scheduling, sweep lines.','Sort endpoints, then define whether touching counts.',
'Merge overlapping intervals','Given closed intervals [start,end] with start≤end, merge overlapping or touching intervals. Return sorted disjoint intervals.','[[1,3],[2,6],[8,10],[10,12]] → [[1,6],[8,12]]',
'Sort by start. Compare each interval with the last merged one. If it overlaps or touches, extend the end; otherwise start a new merged interval.',
'''def merge_intervals(intervals):
    result = []
    for start, end in sorted(intervals):
        if not result or start > result[-1][1]:
            result.append([start, end])
        else:
            result[-1][1] = max(result[-1][1], end)
    return result''','O(n log n)','O(n)','For half-open intervals, touching endpoints may be compatible instead of overlapping. Clarify the problem’s convention.',
[('How do you find the minimum number of meeting rooms?','Sort starts and ends and sweep events, tracking active meetings, or use a min-heap of end times. If a meeting ending at t frees a room for one starting at t, process the end first on ties.'),('How are interval union and intersection different?','Union covers every point present in either collection; merging computes it. Intersection keeps only points covered by both. For two sorted disjoint lists, two pointers can compute intersections in O(n+m).')],
"assert merge_intervals([[1,3],[2,6],[8,10],[10,12]])==[[1,6],[8,12]]; assert merge_intervals([])==[]")

topic('Dynamic programming · 1D','Dynamic programming','State, transition, base cases, memoization, tabulation.','Describe what dp[i] means before writing the loop.',
'Minimum coins for an amount','Given positive integer denominations and nonnegative amount, return the fewest coins needed with unlimited reuse, or −1 if impossible.','coins=[1,3,4], amount=6 → 2',
'dp[total] is the minimum coins for that total. For every usable coin, try one coin plus the best solution for total−coin. Unreachable states remain infinity.',
'''def min_coins(coins, amount):
    if amount < 0 or any(c <= 0 for c in coins):
        raise ValueError('invalid amount or coin')
    dp = [0] + [float('inf')] * amount
    for total in range(1, amount + 1):
        for coin in coins:
            if coin <= total:
                dp[total] = min(dp[total], 1 + dp[total - coin])
    return -1 if dp[amount] == float('inf') else dp[amount]''','O(amount × number of coins)','O(amount)','Zero or negative coin values violate this recurrence’s dependency order.',
[('When is a problem a candidate for DP?','Look for overlapping subproblems and a state that summarizes everything future decisions need. Optimization problems often also use optimal substructure. Define state, transitions, base cases, evaluation order, and final answer.'),('Memoization or tabulation?','Memoization computes needed states on demand and follows recursive structure, but uses a call stack. Tabulation explicitly orders dependencies and often makes space optimization easier. Both must avoid recomputing the same state.')],
"assert min_coins([1,3,4],6)==2; assert min_coins([2],3)==-1; assert min_coins([],0)==0")

topic('Dynamic programming · 2D','Dynamic programming','Subsequence DP, grid states, knapsack, rolling rows.','Choose states from two independent positions or capacities.',
'Longest common subsequence length','Return the length of a longest subsequence common to two strings. Characters need not be contiguous.','"abcde" and "ace" → 3',
'Let a state describe prefixes of both strings. If their final characters match, use one plus the diagonal. Otherwise use the best result after dropping one final character. Keep only the previous row.',
'''def lcs_length(a, b):
    previous = [0] * (len(b) + 1)
    for x in a:
        current = [0]
        for j, y in enumerate(b, 1):
            if x == y:
                current.append(previous[j - 1] + 1)
            else:
                current.append(max(previous[j], current[-1]))
        previous = current
    return previous[-1]''','O(mn)','O(n), n=len(b)','Longest common substring is a different problem: a mismatch resets a contiguous match length.',
[('Why does 0/1 knapsack iterate capacity downward in a 1D table?','Descending order ensures dp[capacity−weight] still belongs to the previous item stage, so the item is used at most once. Ascending order allows the current item to be reused, matching unbounded knapsack.'),('What do you lose with rolling-row space optimization?','You keep the final score but discard most reconstruction information. To recover an actual LCS or chosen items, retain parent decisions, retain the table, or use a more advanced reconstruction technique.')],
"assert lcs_length('abcde','ace')==3; assert lcs_length('abc','def')==0; assert lcs_length('','abc')==0")

topic('Bit manipulation','Core patterns','XOR identities, bit masks, shifts, set-bit operations.','Use bit operations only when the input guarantees justify them.',
'Single number','Every integer occurs exactly twice except one occurring once. Return that single integer. The input is nonempty.','[4,1,2,1,2] → 4',
'XOR all numbers. Since x XOR x is zero and x XOR zero is x, pairs cancel. XOR is associative and commutative, so order does not matter.',
'''def single_number(nums):
    answer = 0
    for value in nums:
        answer ^= value
    return answer''','O(n) fixed-width operations','O(1) fixed-width auxiliary space','The rule fails when repeated values occur three times or several values are unpaired. Python integers also have variable bit length.',
[('What does x & (x−1) do?','For a positive integer x, it clears its least significant set bit. Repeating until zero counts set bits in O(number of set bits) operations. A positive power of two satisfies x & (x−1)==0.'),('How do you use a bit mask to represent a subset?','Bit i indicates whether element i is included. Test with mask & (1<<i), add with mask | (1<<i), and remove with mask & ~(1<<i). Enumerating all masks takes 2^n possibilities.')],
"assert single_number([4,1,2,1,2])==4; assert single_number([-1,2,2])==-1; assert single_number([0])==0",'Easy')

topic('Math & number algorithms','Foundation','GCD, primes, modular arithmetic, overflow assumptions.','Exploit mathematical structure instead of brute force.',
'Greatest common divisor','Return the nonnegative GCD of two integers. Use gcd(0,0)=0. Negative inputs are allowed.','48,18 → 6',
'Euclid’s identity says gcd(a,b)=gcd(b,a mod b). Repeatedly apply it until the second value becomes zero, then the first value is the GCD.',
'''def gcd(a, b):
    a, b = abs(a), abs(b)
    while b:
        a, b = b, a % b
    return a''','O(log(min(|a|,|b|)+1)) remainder steps for nonzero inputs','O(1) integer variables','Modulo and multiplication costs grow with integer bit length; the step count is not a full bit-complexity analysis.',
[('Why test primality only up to the square root?','If n=a×b is composite, at least one factor is at most √n; otherwise their product would exceed n. Handle n<2 and small even values first.'),('When should you use a sieve of Eratosthenes?','When finding many primes up to a limit N. Mark multiples starting at p² for each unmarked p up to √N. Standard complexity is O(N log log N) time and O(N) space.')],
"assert gcd(48,18)==6; assert gcd(-12,8)==4; assert gcd(0,0)==0; assert gcd(0,7)==7",'Easy')

topic('Matrices & grids','Core patterns','Grid neighbors, flood fill, boundary checks, visited state.','Treat each valid cell as a graph vertex.',
'Count islands','Given a rectangular grid of "0" and "1" characters, count 4-directionally connected land components. Do not modify the input.','[["1","1","0"],["0","0","1"]] → 2',
'Scan every cell. For each unseen land cell, start a flood fill using a stack. Mark cells when adding them to prevent repeated work. Each flood fill is one island.',
'''def num_islands(grid):
    if not grid or not grid[0]:
        return 0
    rows, cols = len(grid), len(grid[0])
    seen = set()
    answer = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != '1' or (r, c) in seen:
                continue
            answer += 1
            seen.add((r, c))
            stack = [(r, c)]
            while stack:
                x, y = stack.pop()
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = x + dx, y + dy
                    if (0 <= nx < rows and 0 <= ny < cols
                            and grid[nx][ny] == '1'
                            and (nx, ny) not in seen):
                        seen.add((nx, ny))
                        stack.append((nx, ny))
    return answer''','O(rows × cols)','O(rows × cols)','Diagonal cells do not connect in a 4-direction problem. Clarify 4 versus 8 directions.',
[('How do you rotate a square matrix 90° clockwise in place?','Transpose across the main diagonal, then reverse each row. This takes O(n²) time and can use O(1) extra space with element swaps. The same operation is not an in-place shape-preserving rotation for a nonsquare matrix.'),('How does multi-source BFS work on a grid?','Enqueue all starting cells at distance zero before processing. BFS expands simultaneous layers, finding each cell’s distance to its closest source in an unweighted grid. This fits nearest-zero and spreading-process problems.')],
"assert num_islands([['1','1','0'],['0','0','1']])==2; assert num_islands([])==0; assert num_islands([['0']])==0")

topic('Monotonic stacks & deques','Advanced patterns','Next greater element, daily temperatures, window extrema.','Discard candidates that can never be useful again.',
'Days until a warmer temperature','For each temperature, return how many days until a strictly warmer one. Use zero if no later warmer day exists.','[73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]',
'Keep unresolved indices in a decreasing-temperature stack. A warmer current day resolves every smaller temperature at the top. Each index is pushed and popped at most once.',
'''def daily_temperatures(temps):
    result = [0] * len(temps)
    stack = []
    for i, temperature in enumerate(temps):
        while stack and temps[stack[-1]] < temperature:
            previous = stack.pop()
            result[previous] = i - previous
        stack.append(i)
    return result''','O(n)','O(n)','Use strictly less than, not less than or equal, because equal temperatures are not warmer.',
[('How can a nested while loop still be O(n)?','Count aggregate operations. In a monotonic stack, each index enters once and leaves at most once. Although one iteration may pop many entries, all pops across the whole algorithm total at most n.'),('How do you compute every window maximum in O(n)?','Maintain a deque of indices with decreasing values. Remove expired indices from the front and dominated values from the back; append the new index. The front gives the maximum once the window reaches length k.')],
"assert daily_temperatures([73,74,75,71,69,72,76,73])==[1,1,4,2,1,1,0,0]; assert daily_temperatures([30,30])==[0,0]; assert daily_temperatures([])==[]")

topic('Range queries','Advanced patterns','Fenwick trees, segment trees, updates and aggregation.','Store reusable aggregates over structured ranges.',
'Fenwick tree for point additions and range sums','Create a zero-filled structure of size n. add(index,delta) uses zero-based indices. prefix(end) sums [0,end); range_sum(left,right) sums [left,right). Require valid bounds.','n=5; add(1,3); add(3,7); range_sum(1,4) → 10',
'The internal tree is one-based. Each entry stores a block ending at that index. Updating climbs by i&−i; prefix queries descend by the same least significant set bit.',
'''class Fenwick:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, index, delta):
        if not 0 <= index < self.n:
            raise IndexError('invalid index')
        i = index + 1
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def prefix(self, end):
        if not 0 <= end <= self.n:
            raise IndexError('invalid end')
        total = 0
        while end:
            total += self.tree[end]
            end -= end & -end
        return total

    def range_sum(self, left, right):
        if not 0 <= left <= right <= self.n:
            raise IndexError('invalid range')
        return self.prefix(right) - self.prefix(left)''','O(log n) per update/query; O(n) initialization','O(n)','Internal index zero cannot be used for update traversal: i & −i would be zero and the loop would not advance.',
[('Fenwick tree or segment tree?','Fenwick trees are compact and convenient for prefix sums with point updates. Segment trees support more general associative aggregates such as minimum, maximum, GCD, and custom state; both commonly support O(log n) queries and updates.'),('What is lazy propagation?','A segment-tree node stores a pending range update without immediately touching every descendant. Push that update when descending. Compatible range updates and aggregate queries can then take O(log n), but the combination rules must be correct.')],
"f=Fenwick(5); f.add(1,3); f.add(3,7); assert f.range_sum(1,4)==10; f.add(1,-2); assert f.prefix(5)==8; assert f.range_sum(2,2)==0",'Hard')

topic('Data structure design · LRU','Advanced patterns','Hash maps plus linked ordering, API contracts, invariants.','Combine structures so every required operation stays fast.',
'Least recently used cache','Implement get(key) and put(key,value) with fixed nonnegative capacity. get returns −1 if missing. Accessing or updating a key makes it most recently used. Evict the least recent key when full.','capacity=2; put(1,10), put(2,20), get(1), put(3,30) evicts key 2',
'Use an OrderedDict as a hash map with maintained recency order. Move accesses to the end and evict from the beginning. In an interview without this utility, use a hash map pointing to nodes in a doubly linked list.',
'''from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        if capacity < 0:
            raise ValueError('negative capacity')
        self.capacity = capacity
        self.items = OrderedDict()

    def get(self, key):
        if key not in self.items:
            return -1
        self.items.move_to_end(key)
        return self.items[key]

    def put(self, key, value):
        self.items[key] = value
        self.items.move_to_end(key)
        if len(self.items) > self.capacity:
            self.items.popitem(last=False)''','O(1) expected per operation','O(capacity)','Updating an existing key must also refresh its recency. A zero-capacity cache must retain nothing.',
[('Why combine a hash map with a doubly linked list?','The map finds a key’s node in expected O(1). The doubly linked list removes or moves that known node in O(1) and exposes the least recent endpoint. A singly linked list cannot generally unlink a known node without its predecessor.'),('How do you test an LRU cache?','Check missing reads, repeated reads, updating an existing key, eviction after a read changes recency, capacities zero and one, and values equal to the missing sentinel. Clarify the API if −1 can also be a stored value.')],
"c=LRUCache(2); c.put(1,10); c.put(2,20); assert c.get(1)==10; c.put(3,30); assert c.get(2)==-1; assert c.get(3)==30; z=LRUCache(0); z.put(1,2); assert z.get(1)==-1",'Hard')

def extra(topic_name,title,prompt,example,answer,code,time,space,pitfall,tests,difficulty='Medium'):
    t=next(t for t in TOPICS if t['name']==topic_name)
    t['questions'].append(dict(id=f'{t["id"]}-{len(t["questions"])+1}',title=title,kind='Coding',difficulty=difficulty,prompt=prompt,example=example,answer=answer,code=code.strip(),time=time,space=space,pitfall=pitfall))
    TESTS.append((title,code,tests))

extra('Arrays','Move zeros in place','Move all zeros to the end of a list, preserving nonzero order. Modify and return the original list.','[0,1,0,3,12] → [1,3,12,0,0]',
'Copy nonzero values into successive positions with a write pointer. The write pointer never runs ahead of the read position. Fill the unused suffix with zeros.',
'''def move_zeros(nums):
    write = 0
    for value in nums:
        if value != 0:
            nums[write] = value
            write += 1
    for i in range(write, len(nums)):
        nums[i] = 0
    return nums''','O(n)','O(1)','Swapping each zero with the last value can destroy the required order.',
"a=[0,1,0,3,12]; assert move_zeros(a) is a; assert a==[1,3,12,0,0]; assert move_zeros([0,0])==[0,0]",'Easy')

extra('Two pointers','3Sum without duplicate triplets','Return unique value triplets that sum to zero. Each triplet uses three distinct indices. Input may contain duplicates.','[-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]',
'Sort a copy. Fix one index, then use converging pointers to find complementary pairs. Skip duplicate fixed values and duplicate pointer values after recording an answer.',
'''def three_sum(nums):
    a = sorted(nums)
    result = []
    for i in range(len(a) - 2):
        if i and a[i] == a[i - 1]:
            continue
        left, right = i + 1, len(a) - 1
        while left < right:
            total = a[i] + a[left] + a[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([a[i], a[left], a[right]])
                left += 1
                right -= 1
                while left < right and a[left] == a[left - 1]:
                    left += 1
                while left < right and a[right] == a[right + 1]:
                    right -= 1
    return result''','O(n²)','O(n) auxiliary plus output','Unique value triplets differ from counting all index triplets. Apply duplicate skipping at both levels.',
"assert three_sum([-1,0,1,2,-1,-4])==[[-1,-1,2],[-1,0,1]]; assert three_sum([0,0,0,0])==[[0,0,0]]; assert three_sum([])==[]")

extra('Sliding window','Maximum sum of a fixed-size window','Given an integer array and 1≤k≤n, return the largest sum of any contiguous length-k window.','[2,1,5,1,3,2], k=3 → 9',
'Compute the first window sum. Each move adds the incoming element and removes the outgoing one, giving constant work per window.',
'''def max_window_sum(nums, k):
    if not 1 <= k <= len(nums):
        raise ValueError('invalid window size')
    current = sum(nums[i] for i in range(k))
    best = current
    for right in range(k, len(nums)):
        current += nums[right] - nums[right - k]
        best = max(best, current)
    return best''','O(n)','O(1)','Initialize best to the first actual window, not zero, because all windows might be negative.',
"assert max_window_sum([2,1,5,1,3,2],3)==9; assert max_window_sum([-3,-2],1)==-2",'Easy')

extra('Binary search','Minimum processing speed','Given positive pile sizes, a worker handles at most one pile each hour at integer speed k; a pile of size p takes ceil(p/k) hours. Return the smallest speed finishing within h hours. Require nonempty piles and h≥number of piles.','piles=[3,6,7,11], h=8 → 4',
'Feasibility is monotonic: faster speeds cannot require more hours. Binary-search speeds from 1 through the largest pile and evaluate hours with integer ceiling division.',
'''def minimum_speed(piles, h):
    if not piles or any(p <= 0 for p in piles) or h < len(piles):
        raise ValueError('invalid input')
    low, high = 1, max(piles)
    while low < high:
        mid = (low + high) // 2
        hours = sum((p + mid - 1) // mid for p in piles)
        if hours <= h:
            high = mid
        else:
            low = mid + 1
    return low''','O(n log M), M largest pile','O(1)','Do not use floating-point division and rounding when exact integer ceiling division is available.',
"assert minimum_speed([3,6,7,11],8)==4; assert minimum_speed([10],10)==1; assert minimum_speed([3,6],2)==6")

extra('Linked lists','Reverse a singly linked list','Reverse next pointers in place and return the new head. An empty list returns None.','1 → 2 → 3 → None becomes 3 → 2 → 1 → None',
'Keep previous and current. Save current.next, reverse the current link, then advance both pointers. At termination previous points to the new head.',
'''class Node:
    def __init__(self, value, next=None):
        self.value, self.next = value, next

def reverse_list(head):
    previous, current = None, head
    while current is not None:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous''','O(n)','O(1)','Save the original next pointer before overwriting it, or the unprocessed suffix becomes inaccessible.',
"a=Node(1,Node(2,Node(3))); r=reverse_list(a); assert [r.value,r.next.value,r.next.next.value]==[3,2,1]; assert r.next.next.next is None; assert reverse_list(None) is None",'Easy')

extra('Backtracking','Generate permutations','Return every permutation of a list of distinct integers. For an empty list return [[]].','[1,2] → [[1,2],[2,1]]',
'Build a path and mark used indices. Once the path has n values, save a copy. Undo both the path choice and used marker before trying another branch.',
'''def permutations(nums):
    result, path = [], []
    used = [False] * len(nums)
    def visit():
        if len(path) == len(nums):
            result.append(path.copy())
            return
        for i, value in enumerate(nums):
            if not used[i]:
                used[i] = True
                path.append(value)
                visit()
                path.pop()
                used[i] = False
    visit()
    return result''','O(n · n!) including outputs','O(n) auxiliary; O(n · n!) output','Without undoing used[i], later branches incorrectly believe the value is unavailable.',
"assert sorted(permutations([1,2]))==[[1,2],[2,1]]; assert permutations([])==[[]]")

extra('Binary trees','Lowest common ancestor','Given a binary tree and two distinct node objects p and q that are guaranteed to occur in it, return their lowest common ancestor.','If p and q are in different subtrees of the root, return the root.',
'Return immediately at p or q. Ask both subtrees for a match. If both return a node, the current node is their lowest common ancestor; otherwise propagate the nonempty result.',
'''class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value, self.left, self.right = value, left, right

def lowest_common_ancestor(root, p, q):
    if root is None or root is p or root is q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left is not None and right is not None:
        return root
    return left if left is not None else right''','O(n)','O(h) recursion stack','The guarantee that both nodes exist matters. Without it, this function can return one found node even when the other is absent.',
"p=TreeNode(2); q=TreeNode(3); r=TreeNode(1,p,q); assert lowest_common_ancestor(r,p,q) is r; assert lowest_common_ancestor(r,r,p) is r")

extra('Heaps & priority queues','Merge k sorted lists','Given k sorted Python lists, return one sorted list with all values. Empty lists are allowed.','[[1,4],[1,3,5],[2]] → [1,1,2,3,4,5]',
'Put the first value of each nonempty list in a min-heap together with its source and position. Pop the minimum, append it, and push the next value from that same list.',
'''import heapq

def merge_k_lists(lists):
    heap = [(a[0], i, 0) for i, a in enumerate(lists) if a]
    heapq.heapify(heap)
    result = []
    while heap:
        value, source, position = heapq.heappop(heap)
        result.append(value)
        position += 1
        if position < len(lists[source]):
            heapq.heappush(heap, (lists[source][position], source, position))
    return result''','O(k + N log(k+1)), N total values','O(k) auxiliary; O(N) output','Store source information with each heap value so you know which list to advance.',
"assert merge_k_lists([[1,4],[1,3,5],[2]])==[1,1,2,3,4,5]; assert merge_k_lists([[],[]])==[]",'Hard')

extra('Dynamic programming · 1D','House Robber','Given nonnegative rewards in a line, return the maximum sum obtainable without choosing adjacent positions. Empty input returns zero.','[2,7,9,3,1] → 12',
'For each position either skip it, retaining the best previous answer, or take it together with the best answer two positions back. Only two earlier states are needed.',
'''def rob(nums):
    two_back = one_back = 0
    for reward in nums:
        two_back, one_back = one_back, max(one_back, two_back + reward)
    return one_back''','O(n)','O(1)','For houses arranged in a circle, first and last also conflict; solve two linear ranges excluding one endpoint each.',
"assert rob([2,7,9,3,1])==12; assert rob([])==0; assert rob([5])==5")

extra('Dynamic programming · 1D','Longest increasing subsequence','Return the length of a strictly increasing subsequence. Input values may repeat.','[10,9,2,5,3,7,101,18] → 4',
'Use the quadratic DP first: dp[i] is the longest increasing subsequence ending at i. Try every earlier smaller value as the predecessor. The final answer is the maximum dp entry.',
'''def lis_length(nums):
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp, default=0)''','O(n²)','O(n)','Use < for strictly increasing. An O(n log n) improvement maintains minimum tail values and replaces the first tail ≥ the current value with binary search.',
"assert lis_length([10,9,2,5,3,7,101,18])==4; assert lis_length([2,2,2])==1; assert lis_length([])==0")

extra('Dynamic programming · 2D','0/1 knapsack','Given equal-length weights and values lists, positive integer weights, and a nonnegative integer capacity, maximize total value. Each item can be chosen at most once; choosing nothing is allowed.','weights=[2,3,4], values=[4,5,6], capacity=5 → 9',
'Use dp[c] for the best value within capacity c. For each item, iterate capacities downward and compare skipping it with taking it plus the previous-stage answer for c−weight.',
'''def knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for c in range(capacity, weight - 1, -1):
            dp[c] = max(dp[c], dp[c - weight] + value)
    return dp[capacity]''','O(n × capacity)','O(capacity)','An ascending capacity loop would permit repeated use of the same item and solve an unbounded variant instead.',
"assert knapsack([2,3,4],[4,5,6],5)==9; assert knapsack([2],[3],4)==3; assert knapsack([],[],5)==0")

extra('Dynamic programming · 2D','Edit distance','Return the minimum number of single-character insertions, deletions, and replacements needed to transform a into b. Each operation costs one.','"horse" → "ros" requires 3 edits',
'Use prefix states. Equal final characters inherit the diagonal cost. Otherwise take one plus the minimum of deletion, insertion, and replacement. Initialize transforming to or from an empty prefix.',
'''def edit_distance(a, b):
    previous = list(range(len(b) + 1))
    for i, x in enumerate(a, 1):
        current = [i]
        for j, y in enumerate(b, 1):
            if x == y:
                current.append(previous[j - 1])
            else:
                current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))
        previous = current
    return previous[-1]''','O(mn)','O(n), n=len(b)','The empty-prefix base row and column are lengths, not zeros.',
"assert edit_distance('horse','ros')==3; assert edit_distance('','abc')==3; assert edit_distance('same','same')==0")

extra('Monotonic stacks & deques','Sliding-window maximum','Given an integer list and 1≤k≤n, return the maximum value for each contiguous length-k window.','[1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]',
'Maintain indices in a deque, with values decreasing from front to back. Expire old indices, remove dominated candidates, then append the new index. The front is each completed window’s maximum.',
'''from collections import deque

def window_maximum(nums, k):
    if not 1 <= k <= len(nums):
        raise ValueError('invalid window size')
    candidates, result = deque(), []
    for i, value in enumerate(nums):
        while candidates and candidates[0] <= i - k:
            candidates.popleft()
        while candidates and nums[candidates[-1]] <= value:
            candidates.pop()
        candidates.append(i)
        if i >= k - 1:
            result.append(nums[candidates[0]])
    return result''','O(n)','O(k) auxiliary plus output','Store indices, not only values, because expiration depends on position.',
"assert window_maximum([1,3,-1,-3,5,3,6,7],3)==[3,3,5,5,6,7]; assert window_maximum([2,2],1)==[2,2]",'Hard')

extra('Matrices & grids','Unique paths with obstacles','A rectangular grid contains 0 for open cells and 1 for blocked cells. Count paths from top-left to bottom-right moving only right or down.','[[0,0,0],[0,1,0],[0,0,0]] → 2',
'In a rolling row, dp[c] initially represents paths from above and dp[c−1] represents paths from the left. A blocked cell resets its path count to zero.',
'''def unique_paths(grid):
    if not grid or not grid[0]:
        return 0
    dp = [0] * len(grid[0])
    dp[0] = 1
    for row in grid:
        for c, blocked in enumerate(row):
            if blocked:
                dp[c] = 0
            elif c > 0:
                dp[c] += dp[c - 1]
    return dp[-1]''','O(rows × cols) arithmetic operations','O(cols)','A blocked start or destination must give zero. Large path counts increase Python integer arithmetic costs.',
"assert unique_paths([[0,0,0],[0,1,0],[0,0,0]])==2; assert unique_paths([[1]])==0; assert unique_paths([[0]])==1")

extra('Strings','Longest palindromic substring','Return any longest contiguous palindrome. Matching is case-sensitive; spaces are ordinary characters. Empty input returns "".','"babad" → "bab" or "aba"',
'Every palindrome has a center at one character or between two characters. Expand around all 2n possible centers, recording the longest valid interval.',
'''def longest_palindrome(text):
    start = end = 0
    for center in range(len(text)):
        for left, right in ((center, center), (center, center + 1)):
            while left >= 0 and right < len(text) and text[left] == text[right]:
                if right - left + 1 > end - start:
                    start, end = left, right + 1
                left -= 1
                right += 1
    return text[start:end]''','O(n²)','O(1) auxiliary; O(n) returned substring','Checking only single-character centers misses even-length palindromes such as "abba".',
"assert longest_palindrome('babad') in ['bab','aba']; assert longest_palindrome('cbbd')=='bb'; assert longest_palindrome('')==''")

extra('Graph traversal','Shortest path in an unweighted graph','Given adjacency lists for vertices 0..n−1 and valid start/target vertices, return one shortest path as a list of vertices, or [] if unreachable.','graph=[[1,2],[3],[3],[]], start=0, target=3 → [0,1,3]',
'Use BFS and store a parent the first time each vertex is discovered. The first discovery gives the minimum number of edges. Reconstruct by following parents from target back to start.',
'''from collections import deque

def shortest_unweighted(graph, start, target):
    parent = {start: None}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node == target:
            path = []
            while node is not None:
                path.append(node)
                node = parent[node]
            return path[::-1]
        for neighbor in graph[node]:
            if neighbor not in parent:
                parent[neighbor] = node
                queue.append(neighbor)
    return []''','O(V + E)','O(V), including parents, queue, and path','Mark vertices on discovery, not after repeatedly queuing them. Weighted graphs need a different shortest-path rule.',
"assert shortest_unweighted([[1,2],[3],[3],[]],0,3)==[0,1,3]; assert shortest_unweighted([[],[]],0,1)==[]; assert shortest_unweighted([[]],0,0)==[0]")


if __name__=='__main__':
    count=0
    for name,code,tests in TESTS:
        namespace={}
        exec(code,namespace)
        exec(tests,namespace)
        count+=1
    root=Path(__file__).resolve().parents[1]
    (root/'public/curriculum-data.js').write_text('const CURRICULUM = '+json.dumps(TOPICS,ensure_ascii=False,indent=2)+';\n')
    print(f'Validated {count} Python solution suites; generated {len(TOPICS)} topics and {sum(len(t["questions"]) for t in TOPICS)} questions.')
