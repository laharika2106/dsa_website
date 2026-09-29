const CURRICULUM = [
  {
    "id": "1",
    "name": "Complexity & analysis",
    "stage": "Foundation",
    "summary": "Big O, auxiliary space, recursion depth, amortized analysis.",
    "pattern": "Estimate time before choosing a solution.",
    "questions": [
      {
        "id": "1-1",
        "title": "Analyze pair counting",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Return the number of index pairs (i, j) with i < j whose values sum to target. Count different index pairs separately. Input: a list of integers.",
        "example": "[1, 1, 2, 2], target=3 → 4",
        "answer": "Keep a frequency map of earlier values. Each current value forms one pair with every earlier complement. Looking up before incrementing prevents pairing an element with itself. Compare this with checking all n(n−1)/2 pairs.",
        "code": "def count_pairs(nums, target):\n    seen = {}\n    total = 0\n    for value in nums:\n        total += seen.get(target - value, 0)\n        seen[value] = seen.get(value, 0) + 1\n    return total",
        "time": "O(n) expected",
        "space": "O(n)",
        "pitfall": "Counting distinct value pairs is a different problem from counting index pairs."
      },
      {
        "id": "1-2",
        "title": "What do O, Ω, and Θ mean?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What do O, Ω, and Θ mean?",
        "answer": "O is an asymptotic upper bound; Ω is a lower bound; Θ is a tight bound. They do not inherently mean worst, best, and average case. Specify the case and input size being analyzed."
      },
      {
        "id": "1-3",
        "title": "Why is Python list append amortized O(1)?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Why is Python list append amortized O(1)?",
        "answer": "Occasional resizing copies existing elements and costs O(n). Across a long sequence of appends, resizing work spreads over the operations, giving amortized O(1) per append. A single append can still cost O(n)."
      }
    ]
  },
  {
    "id": "2",
    "name": "Arrays",
    "stage": "Foundation",
    "summary": "Traversal, in-place changes, subarrays, boundary handling.",
    "pattern": "Maintain a useful invariant while scanning.",
    "questions": [
      {
        "id": "2-1",
        "title": "Maximum subarray sum",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Return the maximum sum of a nonempty contiguous subarray. Return None for an empty input. Values may be negative.",
        "example": "[-2,1,-3,4,-1,2,1,-5,4] → 6",
        "answer": "Kadane’s algorithm tracks the best subarray ending at the current element. Either extend the previous subarray or start a new one. Track the best ending value seen anywhere.",
        "code": "def max_subarray(nums):\n    if not nums:\n        return None\n    ending = best = nums[0]\n    for i in range(1, len(nums)):\n        value = nums[i]\n        ending = max(value, ending + value)\n        best = max(best, ending)\n    return best",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "Starting best at zero incorrectly permits an empty subarray when all numbers are negative."
      },
      {
        "id": "2-2",
        "title": "What is the difference between a subarray and a subsequence?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What is the difference between a subarray and a subsequence?",
        "answer": "A subarray is contiguous. A subsequence preserves order but can skip elements. For [1,2,3], [1,3] is a subsequence but not a subarray."
      },
      {
        "id": "2-3",
        "title": "How do you move zeros without changing other values’ order?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you move zeros without changing other values’ order?",
        "answer": "Use a write pointer. Copy each nonzero to nums[write], advance write, and then fill the remaining suffix with zeros. This is stable, O(n) time, and O(1) auxiliary space."
      },
      {
        "id": "2-4",
        "title": "Move zeros in place",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Move all zeros to the end of a list, preserving nonzero order. Modify and return the original list.",
        "example": "[0,1,0,3,12] → [1,3,12,0,0]",
        "answer": "Copy nonzero values into successive positions with a write pointer. The write pointer never runs ahead of the read position. Fill the unused suffix with zeros.",
        "code": "def move_zeros(nums):\n    write = 0\n    for value in nums:\n        if value != 0:\n            nums[write] = value\n            write += 1\n    for i in range(write, len(nums)):\n        nums[i] = 0\n    return nums",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "Swapping each zero with the last value can destroy the required order."
      }
    ]
  },
  {
    "id": "3",
    "name": "Strings",
    "stage": "Foundation",
    "summary": "Character counts, normalization, palindromes, substring logic.",
    "pattern": "Clarify case, spaces, and character assumptions.",
    "questions": [
      {
        "id": "3-1",
        "title": "First non-repeating character",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Return the index of the first character occurring once, or −1 if none exists. Matching is case-sensitive and spaces count as characters.",
        "example": "\"leetcode\" → 0; \"aabb\" → −1",
        "answer": "Count all characters, then scan the original string to preserve order. The first character with frequency one gives the required index.",
        "code": "def first_unique(text):\n    counts = {}\n    for char in text:\n        counts[char] = counts.get(char, 0) + 1\n    for i, char in enumerate(text):\n        if counts[char] == 1:\n            return i\n    return -1",
        "time": "O(n) expected",
        "space": "O(k), k distinct characters",
        "pitfall": "A set records membership but loses the frequencies needed to distinguish one occurrence from several."
      },
      {
        "id": "3-2",
        "title": "How do you check whether two strings are anagrams?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How do you check whether two strings are anagrams?",
        "answer": "After agreeing on normalization, compare their character-frequency maps. Equal lengths and equal counts imply anagrams. Hash counting takes expected O(n+m) time; sorting takes O(n log n + m log m)."
      },
      {
        "id": "3-3",
        "title": "Why can repeated string concatenation be expensive?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Why can repeated string concatenation be expensive?",
        "answer": "Strings are immutable. Repeatedly extending a string may copy accumulated content, giving quadratic work in a naive loop. Collect pieces in a list and use \"\".join(parts) for predictable linear assembly in total output size."
      },
      {
        "id": "3-4",
        "title": "Longest palindromic substring",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return any longest contiguous palindrome. Matching is case-sensitive; spaces are ordinary characters. Empty input returns \"\".",
        "example": "\"babad\" → \"bab\" or \"aba\"",
        "answer": "Every palindrome has a center at one character or between two characters. Expand around all 2n possible centers, recording the longest valid interval.",
        "code": "def longest_palindrome(text):\n    start = end = 0\n    for center in range(len(text)):\n        for left, right in ((center, center), (center, center + 1)):\n            while left >= 0 and right < len(text) and text[left] == text[right]:\n                if right - left + 1 > end - start:\n                    start, end = left, right + 1\n                left -= 1\n                right += 1\n    return text[start:end]",
        "time": "O(n²)",
        "space": "O(1) auxiliary; O(n) returned substring",
        "pitfall": "Checking only single-character centers misses even-length palindromes such as \"abba\"."
      }
    ]
  },
  {
    "id": "4",
    "name": "Hash maps & sets",
    "stage": "Foundation",
    "summary": "Frequency maps, membership, complements, grouping.",
    "pattern": "Trade extra memory for fast expected lookup.",
    "questions": [
      {
        "id": "4-1",
        "title": "Two sum indices",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Return indices of two different elements that sum to target. Return None if no pair exists. Any valid pair is acceptable.",
        "example": "[2,7,11,15], target=9 → (0,1)",
        "answer": "For each element, look for its complement in a map of earlier values to indices. Return when found; otherwise store the current value. This naturally uses different indices.",
        "code": "def two_sum(nums, target):\n    indices = {}\n    for i, value in enumerate(nums):\n        complement = target - value\n        if complement in indices:\n            return indices[complement], i\n        indices[value] = i\n    return None",
        "time": "O(n) expected",
        "space": "O(n)",
        "pitfall": "Insert after checking. Inserting first can match an element with itself."
      },
      {
        "id": "4-2",
        "title": "How does a hash collision differ from a duplicate key?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How does a hash collision differ from a duplicate key?",
        "answer": "Different keys can map to the same bucket; this is a collision, resolved by the table implementation. Equal keys represent the same logical key, so assigning again replaces its value."
      },
      {
        "id": "4-3",
        "title": "Are hash lookups always O(1)?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Are hash lookups always O(1)?",
        "answer": "No. O(1) is an expected or amortized claim under suitable hashing and load management. Collisions can worsen performance. Also account for the cost of hashing and comparing long keys."
      }
    ]
  },
  {
    "id": "5",
    "name": "Two pointers",
    "stage": "Core patterns",
    "summary": "Converging pointers, read/write pointers, sorted input.",
    "pattern": "Move pointers using a provable ordering rule.",
    "questions": [
      {
        "id": "5-1",
        "title": "Pair sum in a sorted array",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Given a nondecreasing integer array, return two different indices with the target sum, or None.",
        "example": "[1,2,4,6,8], target=10 → (1,4)",
        "answer": "Place pointers at both ends. If the sum is too small, only increasing the left value can help. If too large, decrease the right value. Each move rules out one position.",
        "code": "def sorted_pair(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        total = nums[left] + nums[right]\n        if total == target:\n            return left, right\n        if total < target:\n            left += 1\n        else:\n            right -= 1\n    return None",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "This movement rule requires sorted input. Sorting first changes original indices."
      },
      {
        "id": "5-2",
        "title": "When should you use two pointers?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "When should you use two pointers?",
        "answer": "Look for sorted arrays, pairing extremes, palindrome checks, merging sorted sequences, or in-place compaction. Explain why moving a pointer cannot discard a valid better answer."
      },
      {
        "id": "5-3",
        "title": "How do you remove duplicates from a sorted array in place?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you remove duplicates from a sorted array in place?",
        "answer": "Keep a write position for the next unique value. Scan left to right and copy only when the value differs from the last written one. Return the unique prefix length; elements after that length are irrelevant."
      },
      {
        "id": "5-4",
        "title": "3Sum without duplicate triplets",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return unique value triplets that sum to zero. Each triplet uses three distinct indices. Input may contain duplicates.",
        "example": "[-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]",
        "answer": "Sort a copy. Fix one index, then use converging pointers to find complementary pairs. Skip duplicate fixed values and duplicate pointer values after recording an answer.",
        "code": "def three_sum(nums):\n    a = sorted(nums)\n    result = []\n    for i in range(len(a) - 2):\n        if i and a[i] == a[i - 1]:\n            continue\n        left, right = i + 1, len(a) - 1\n        while left < right:\n            total = a[i] + a[left] + a[right]\n            if total < 0:\n                left += 1\n            elif total > 0:\n                right -= 1\n            else:\n                result.append([a[i], a[left], a[right]])\n                left += 1\n                right -= 1\n                while left < right and a[left] == a[left - 1]:\n                    left += 1\n                while left < right and a[right] == a[right + 1]:\n                    right -= 1\n    return result",
        "time": "O(n²)",
        "space": "O(n) auxiliary plus output",
        "pitfall": "Unique value triplets differ from counting all index triplets. Apply duplicate skipping at both levels."
      }
    ]
  },
  {
    "id": "6",
    "name": "Sliding window",
    "stage": "Core patterns",
    "summary": "Fixed windows, variable windows, frequency constraints.",
    "pattern": "Grow right; shrink left until valid again.",
    "questions": [
      {
        "id": "6-1",
        "title": "Longest substring without repeated characters",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return the length of the longest contiguous substring containing no repeated character.",
        "example": "\"abcabcbb\" → 3",
        "answer": "Store the last index of each character. When a repeated character is inside the window, move left past its earlier position. Never move left backward.",
        "code": "def longest_unique(text):\n    last = {}\n    left = best = 0\n    for right, char in enumerate(text):\n        left = max(left, last.get(char, -1) + 1)\n        last[char] = right\n        best = max(best, right - left + 1)\n    return best",
        "time": "O(n) expected",
        "space": "O(k), distinct characters",
        "pitfall": "Assigning left = last[char]+1 without max can move left backward, for example in \"abba\"."
      },
      {
        "id": "6-2",
        "title": "Fixed window or variable window?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Fixed window or variable window?",
        "answer": "Use a fixed window when the length k is specified, updating outgoing and incoming elements. Use a variable window when a validity rule determines the length, such as at most k distinct values."
      },
      {
        "id": "6-3",
        "title": "Can a shrinking window always solve subarray sum equals k?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Can a shrinking window always solve subarray sum equals k?",
        "answer": "No. With negative numbers, expanding can decrease the sum and shrinking can increase it, breaking the usual monotonic rule. Prefix sums with a frequency map handle arbitrary integers."
      },
      {
        "id": "6-4",
        "title": "Maximum sum of a fixed-size window",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Given an integer array and 1≤k≤n, return the largest sum of any contiguous length-k window.",
        "example": "[2,1,5,1,3,2], k=3 → 9",
        "answer": "Compute the first window sum. Each move adds the incoming element and removes the outgoing one, giving constant work per window.",
        "code": "def max_window_sum(nums, k):\n    if not 1 <= k <= len(nums):\n        raise ValueError('invalid window size')\n    current = sum(nums[i] for i in range(k))\n    best = current\n    for right in range(k, len(nums)):\n        current += nums[right] - nums[right - k]\n        best = max(best, current)\n    return best",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "Initialize best to the first actual window, not zero, because all windows might be negative."
      }
    ]
  },
  {
    "id": "7",
    "name": "Prefix sums",
    "stage": "Core patterns",
    "summary": "Range sums, cumulative counts, subarray identities.",
    "pattern": "A subarray sum equals the difference of two prefixes.",
    "questions": [
      {
        "id": "7-1",
        "title": "Count subarrays with sum k",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Count nonempty contiguous subarrays whose sum equals k. Negative values and zeros are allowed.",
        "example": "[1,1,1], k=2 → 2",
        "answer": "Let current be the running prefix sum. Every earlier prefix equal to current−k starts a valid subarray ending here. Seed prefix zero once to count subarrays starting at index zero.",
        "code": "def subarray_sum(nums, k):\n    frequencies = {0: 1}\n    prefix = answer = 0\n    for value in nums:\n        prefix += value\n        answer += frequencies.get(prefix - k, 0)\n        frequencies[prefix] = frequencies.get(prefix, 0) + 1\n    return answer",
        "time": "O(n) expected",
        "space": "O(n)",
        "pitfall": "A set is insufficient: equal prefix sums at different indices create different subarrays."
      },
      {
        "id": "7-2",
        "title": "How do you answer an inclusive range-sum query?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How do you answer an inclusive range-sum query?",
        "answer": "Build prefix with prefix[0]=0 and prefix[i+1]=prefix[i]+a[i]. Then sum(a[l:r+1]) is prefix[r+1]−prefix[l]. Preprocessing is O(n), and each valid query is O(1)."
      },
      {
        "id": "7-3",
        "title": "What if array values change between queries?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "What if array values change between queries?",
        "answer": "Plain prefix sums require rebuilding many suffix entries after an update. A Fenwick tree or segment tree supports point updates and range sums in O(log n)."
      }
    ]
  },
  {
    "id": "8",
    "name": "Binary search",
    "stage": "Core patterns",
    "summary": "Bounds, monotonic predicates, search on answers.",
    "pattern": "Define the search interval and preserve its invariant.",
    "questions": [
      {
        "id": "8-1",
        "title": "First occurrence with lower bound",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Given a sorted array, return the first index equal to target, or −1. Duplicates are allowed.",
        "example": "[1,2,2,2,4], target=2 → 1",
        "answer": "Search the half-open interval [lo, hi) for the first value not less than target. Values before lo are smaller; potential lower-bound positions remain within the interval. Verify equality afterward.",
        "code": "def first_occurrence(nums, target):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo if lo < len(nums) and nums[lo] == target else -1",
        "time": "O(log n)",
        "space": "O(1)",
        "pitfall": "Mixing inclusive and half-open boundary rules can skip values or create infinite loops."
      },
      {
        "id": "8-2",
        "title": "What is binary search on the answer?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What is binary search on the answer?",
        "answer": "Search an ordered range of possible answers using a monotonic feasibility check. Example: find minimum processing speed that meets a deadline. Prove that once a speed works, every larger speed also works."
      },
      {
        "id": "8-3",
        "title": "Why use hi = mid instead of mid−1 here?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Why use hi = mid instead of mid−1 here?",
        "answer": "The interval is half-open and mid may be the first valid position. Retaining mid as the exclusive upper bound of remaining smaller candidates allows the final boundary to converge to mid without skipping it."
      },
      {
        "id": "8-4",
        "title": "Minimum processing speed",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given positive pile sizes, a worker handles at most one pile each hour at integer speed k; a pile of size p takes ceil(p/k) hours. Return the smallest speed finishing within h hours. Require nonempty piles and h≥number of piles.",
        "example": "piles=[3,6,7,11], h=8 → 4",
        "answer": "Feasibility is monotonic: faster speeds cannot require more hours. Binary-search speeds from 1 through the largest pile and evaluate hours with integer ceiling division.",
        "code": "def minimum_speed(piles, h):\n    if not piles or any(p <= 0 for p in piles) or h < len(piles):\n        raise ValueError('invalid input')\n    low, high = 1, max(piles)\n    while low < high:\n        mid = (low + high) // 2\n        hours = sum((p + mid - 1) // mid for p in piles)\n        if hours <= h:\n            high = mid\n        else:\n            low = mid + 1\n    return low",
        "time": "O(n log M), M largest pile",
        "space": "O(1)",
        "pitfall": "Do not use floating-point division and rounding when exact integer ceiling division is available."
      }
    ]
  },
  {
    "id": "9",
    "name": "Sorting",
    "stage": "Foundation",
    "summary": "Stability, comparators, merge sort, quicksort, counting sort.",
    "pattern": "Choose by constraints, stability, and memory.",
    "questions": [
      {
        "id": "9-1",
        "title": "Merge two sorted arrays",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Return a sorted list containing all values of two nondecreasing lists. Preserve duplicates.",
        "example": "[1,3,5] and [2,3,6] → [1,2,3,3,5,6]",
        "answer": "Compare the current values from both inputs and append the smaller one. On ties choose the left input first for stability. Append the unconsumed suffixes.",
        "code": "def merge_sorted(a, b):\n    i = j = 0\n    result = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i += 1\n        else:\n            result.append(b[j])\n            j += 1\n    result.extend(a[i:])\n    result.extend(b[j:])\n    return result",
        "time": "O(n + m)",
        "space": "O(n + m), including output and temporary slices",
        "pitfall": "A strict less-than tie rule may reverse equal-key records across the two inputs."
      },
      {
        "id": "9-2",
        "title": "What is a stable sort?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What is a stable sort?",
        "answer": "Equal-key records keep their relative input order. Stability is useful when sorting records by multiple keys in successive passes. Standard merge sort can be stable; ordinary in-place quicksort is usually not."
      },
      {
        "id": "9-3",
        "title": "When can sorting beat the comparison lower bound?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "When can sorting beat the comparison lower bound?",
        "answer": "Ω(n log n) applies to general comparison sorting. Counting sort exploits a bounded integer key range and can run in O(n+k) time using O(k) counting space. Radix sort exploits digit structure under suitable assumptions."
      }
    ]
  },
  {
    "id": "10",
    "name": "Linked lists",
    "stage": "Data structures",
    "summary": "Pointer updates, reversal, fast/slow pointers, cycles.",
    "pattern": "Save the next link before overwriting it.",
    "questions": [
      {
        "id": "10-1",
        "title": "Detect a linked-list cycle",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Given head of a singly linked list, return True if following next pointers eventually revisits a node. Compare node identity, not value.",
        "example": "1 → 2 → 3 → node 2 gives True",
        "answer": "Floyd’s algorithm moves slow one link and fast two links. In a cycle their relative distance changes by one each step, so they meet. Without a cycle, fast reaches None.",
        "code": "class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next\n\ndef has_cycle(head):\n    slow = fast = head\n    while fast is not None and fast.next is not None:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "Two different nodes may hold the same value. Equality of values does not prove a cycle."
      },
      {
        "id": "10-2",
        "title": "How do you find the middle node?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How do you find the middle node?",
        "answer": "Move slow one step and fast two steps until fast cannot advance. Slow ends at the middle; with the common loop it returns the second of two middle nodes for an even-length list."
      },
      {
        "id": "10-3",
        "title": "How do you find the start of a cycle?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you find the start of a cycle?",
        "answer": "After slow and fast meet, move one pointer to head. Advance both one step at a time. Their next meeting is the cycle entry; this follows from the distances traveled before and within the cycle."
      },
      {
        "id": "10-4",
        "title": "Reverse a singly linked list",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Reverse next pointers in place and return the new head. An empty list returns None.",
        "example": "1 → 2 → 3 → None becomes 3 → 2 → 1 → None",
        "answer": "Keep previous and current. Save current.next, reverse the current link, then advance both pointers. At termination previous points to the new head.",
        "code": "class Node:\n    def __init__(self, value, next=None):\n        self.value, self.next = value, next\n\ndef reverse_list(head):\n    previous, current = None, head\n    while current is not None:\n        next_node = current.next\n        current.next = previous\n        previous = current\n        current = next_node\n    return previous",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "Save the original next pointer before overwriting it, or the unprocessed suffix becomes inaccessible."
      }
    ]
  },
  {
    "id": "11",
    "name": "Stacks",
    "stage": "Data structures",
    "summary": "Balanced delimiters, expression parsing, undo.",
    "pattern": "Store unresolved work in last-in-first-out order.",
    "questions": [
      {
        "id": "11-1",
        "title": "Validate brackets",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "A string contains only (), [], and {}. Return whether every opening bracket is correctly matched and nested. The empty string is valid.",
        "example": "\"([]{})\" → True; \"([)]\" → False",
        "answer": "Push opening brackets. For each closing bracket, require a nonempty stack with the matching opener at the top. At the end the stack must be empty.",
        "code": "def valid_brackets(text):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for char in text:\n        if char in '([{':\n            stack.append(char)\n        elif char not in pairs or not stack or stack.pop() != pairs[char]:\n            return False\n    return not stack",
        "time": "O(n)",
        "space": "O(n)",
        "pitfall": "Balanced counts alone do not guarantee correct nesting; \"([)]\" has equal counts but is invalid."
      },
      {
        "id": "11-2",
        "title": "Why does a stack fit nested expressions?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why does a stack fit nested expressions?",
        "answer": "The most recently opened structure must close first. This is exactly last-in-first-out behavior, so the stack top represents the next unresolved opening delimiter."
      },
      {
        "id": "11-3",
        "title": "How can a stack return the minimum in O(1)?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How can a stack return the minimum in O(1)?",
        "answer": "Store each pushed value together with the minimum up to that depth, or maintain a second minimum stack including duplicates. Push, pop, top, and minimum are O(1), using O(n) space."
      }
    ]
  },
  {
    "id": "12",
    "name": "Queues & deques",
    "stage": "Data structures",
    "summary": "FIFO processing, BFS queues, both-end operations.",
    "pattern": "Process items in arrival order.",
    "questions": [
      {
        "id": "12-1",
        "title": "Implement a queue using two stacks",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Support push(value) and pop() in FIFO order. Raise IndexError when popping an empty queue.",
        "example": "push(10), push(20), pop() → 10",
        "answer": "New values enter incoming. To pop, use outgoing; if it is empty, transfer all incoming values to outgoing, reversing order. Each element transfers at most once.",
        "code": "class TwoStackQueue:\n    def __init__(self):\n        self.incoming = []\n        self.outgoing = []\n\n    def push(self, value):\n        self.incoming.append(value)\n\n    def pop(self):\n        if not self.outgoing:\n            while self.incoming:\n                self.outgoing.append(self.incoming.pop())\n        if not self.outgoing:\n            raise IndexError('empty queue')\n        return self.outgoing.pop()",
        "time": "Amortized O(1) per operation; worst-case O(n) pop",
        "space": "O(n)",
        "pitfall": "Transfer only when outgoing is empty. Transferring on every pop can break ordering and waste work."
      },
      {
        "id": "12-2",
        "title": "Why use deque instead of list.pop(0) for a queue?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why use deque instead of list.pop(0) for a queue?",
        "answer": "Removing the first list element shifts remaining elements and takes O(n). collections.deque supports append and popleft in O(1) time."
      },
      {
        "id": "12-3",
        "title": "Queue, deque, or priority queue?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Queue, deque, or priority queue?",
        "answer": "A queue removes the oldest item. A deque permits insertion and removal at both ends. A priority queue removes the item with highest or lowest priority, independently of arrival order."
      }
    ]
  },
  {
    "id": "13",
    "name": "Recursion & divide-and-conquer",
    "stage": "Core patterns",
    "summary": "Base cases, recurrence relations, call-stack space.",
    "pattern": "Make progress toward a smaller instance.",
    "questions": [
      {
        "id": "13-1",
        "title": "Fast integer power",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Compute x raised to nonnegative integer n using exponentiation by squaring. Use 0^0 = 1 by convention.",
        "example": "x=2, n=10 → 1024",
        "answer": "Compute the half power once. Square it for even n and multiply by x once more for odd n. Each call halves n, so recursion depth is logarithmic.",
        "code": "def fast_power(x, n):\n    if n < 0:\n        raise ValueError('n must be nonnegative')\n    if n == 0:\n        return 1\n    half = fast_power(x, n // 2)\n    return half * half if n % 2 == 0 else half * half * x",
        "time": "O(log n) multiplications for n ≥ 1",
        "space": "O(log n) call stack",
        "pitfall": "Calling fast_power twice for the same half repeats work. Large-integer multiplication itself is not constant time."
      },
      {
        "id": "13-2",
        "title": "What must every recursive solution establish?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What must every recursive solution establish?",
        "answer": "A base case, progress toward it, and a rule combining smaller answers. State the invariant for each call and include recursion stack usage in the space analysis."
      },
      {
        "id": "13-3",
        "title": "How do you reason about T(n)=2T(n/2)+O(n)?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you reason about T(n)=2T(n/2)+O(n)?",
        "answer": "Each level does O(n) total merging work and there are O(log n) levels, giving O(n log n). This is the standard balanced merge-sort recurrence."
      }
    ]
  },
  {
    "id": "14",
    "name": "Backtracking",
    "stage": "Core patterns",
    "summary": "Subsets, permutations, pruning, choose/explore/undo.",
    "pattern": "Explore candidates while restoring shared state.",
    "questions": [
      {
        "id": "14-1",
        "title": "Generate all subsets",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given distinct integers, return all subsets in any order. Include the empty subset.",
        "example": "[1,2] → [[],[1],[1,2],[2]]",
        "answer": "At each recursion level, record the current subset and try every later element. The start index avoids reusing earlier choices and eliminates duplicate subset orderings.",
        "code": "def subsets(nums):\n    result, path = [], []\n    def visit(start):\n        result.append(path.copy())\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            visit(i + 1)\n            path.pop()\n    visit(0)\n    return result",
        "time": "O(n · 2^n), including copying outputs",
        "space": "O(n) auxiliary; O(n · 2^n) output",
        "pitfall": "Appending path itself aliases the mutable list. Append path.copy() to preserve each answer."
      },
      {
        "id": "14-2",
        "title": "How is backtracking different from ordinary recursion?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How is backtracking different from ordinary recursion?",
        "answer": "Backtracking recursively explores alternative choices and undoes each choice before trying the next. Recursion is the broader technique; not all recursion searches alternatives."
      },
      {
        "id": "14-3",
        "title": "How do you avoid duplicate subsets when input contains duplicates?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you avoid duplicate subsets when input contains duplicates?",
        "answer": "Sort the values. At a given recursion depth, skip nums[i] when i>start and nums[i]==nums[i−1]. Equal values may still be chosen at deeper levels, allowing subsets with repeated elements."
      },
      {
        "id": "14-4",
        "title": "Generate permutations",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return every permutation of a list of distinct integers. For an empty list return [[]].",
        "example": "[1,2] → [[1,2],[2,1]]",
        "answer": "Build a path and mark used indices. Once the path has n values, save a copy. Undo both the path choice and used marker before trying another branch.",
        "code": "def permutations(nums):\n    result, path = [], []\n    used = [False] * len(nums)\n    def visit():\n        if len(path) == len(nums):\n            result.append(path.copy())\n            return\n        for i, value in enumerate(nums):\n            if not used[i]:\n                used[i] = True\n                path.append(value)\n                visit()\n                path.pop()\n                used[i] = False\n    visit()\n    return result",
        "time": "O(n · n!) including outputs",
        "space": "O(n) auxiliary; O(n · n!) output",
        "pitfall": "Without undoing used[i], later branches incorrectly believe the value is unavailable."
      }
    ]
  },
  {
    "id": "15",
    "name": "Binary trees",
    "stage": "Data structures",
    "summary": "Traversals, height, diameter, level order, LCA.",
    "pattern": "Separate each node’s local work from subtree answers.",
    "questions": [
      {
        "id": "15-1",
        "title": "Level-order traversal",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return node values grouped by level from left to right. Return [] for an empty tree.",
        "example": "Root 1 with children 2 and 3 → [[1],[2,3]]",
        "answer": "Use a queue. Capture its length at the start of each level, then process exactly that many nodes. Children appended during processing belong to the next level.",
        "code": "from collections import deque\nclass TreeNode:\n    def __init__(self, value, left=None, right=None):\n        self.value, self.left, self.right = value, left, right\n\ndef level_order(root):\n    if root is None:\n        return []\n    queue, result = deque([root]), []\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.value)\n            if node.left is not None:\n                queue.append(node.left)\n            if node.right is not None:\n                queue.append(node.right)\n        result.append(level)\n    return result",
        "time": "O(n)",
        "space": "O(w) auxiliary queue; O(n) output, w maximum width",
        "pitfall": "Do not let the loop boundary grow as children are enqueued, or several levels can merge into one."
      },
      {
        "id": "15-2",
        "title": "Preorder, inorder, or postorder?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Preorder, inorder, or postorder?",
        "answer": "Preorder visits node-left-right, useful for copying structure. Inorder visits left-node-right and yields sorted keys in a BST. Postorder visits left-right-node, useful when a parent needs completed child results."
      },
      {
        "id": "15-3",
        "title": "How do you compute a tree’s diameter efficiently?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you compute a tree’s diameter efficiently?",
        "answer": "A postorder function returns subtree height. At each node, the longest path through it has left_height+right_height edges. Maintain the maximum globally while returning 1+max(left_height,right_height), for O(n) time."
      },
      {
        "id": "15-4",
        "title": "Lowest common ancestor",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given a binary tree and two distinct node objects p and q that are guaranteed to occur in it, return their lowest common ancestor.",
        "example": "If p and q are in different subtrees of the root, return the root.",
        "answer": "Return immediately at p or q. Ask both subtrees for a match. If both return a node, the current node is their lowest common ancestor; otherwise propagate the nonempty result.",
        "code": "class TreeNode:\n    def __init__(self, value, left=None, right=None):\n        self.value, self.left, self.right = value, left, right\n\ndef lowest_common_ancestor(root, p, q):\n    if root is None or root is p or root is q:\n        return root\n    left = lowest_common_ancestor(root.left, p, q)\n    right = lowest_common_ancestor(root.right, p, q)\n    if left is not None and right is not None:\n        return root\n    return left if left is not None else right",
        "time": "O(n)",
        "space": "O(h) recursion stack",
        "pitfall": "The guarantee that both nodes exist matters. Without it, this function can return one found node even when the other is absent."
      }
    ]
  },
  {
    "id": "16",
    "name": "BSTs & balanced trees",
    "stage": "Data structures",
    "summary": "Ordering bounds, predecessor/successor, balanced height.",
    "pattern": "Validate whole-subtree constraints, not only children.",
    "questions": [
      {
        "id": "16-1",
        "title": "Validate a strict binary search tree",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return whether every node is strictly greater than all keys in its left subtree and strictly less than all keys in its right subtree. Duplicates are invalid.",
        "example": "Root 5, left 1, right 7 with left child 4 → False",
        "answer": "Carry exclusive lower and upper bounds downward. Moving left tightens the upper bound; moving right tightens the lower bound. Every node must satisfy both inherited bounds.",
        "code": "class TreeNode:\n    def __init__(self, value, left=None, right=None):\n        self.value, self.left, self.right = value, left, right\n\ndef valid_bst(root):\n    def visit(node, low, high):\n        if node is None:\n            return True\n        if not low < node.value < high:\n            return False\n        return (visit(node.left, low, node.value)\n                and visit(node.right, node.value, high))\n    return visit(root, float('-inf'), float('inf'))",
        "time": "O(n)",
        "space": "O(h) recursion stack",
        "pitfall": "Checking only node.left < node < node.right misses violations deeper in a subtree."
      },
      {
        "id": "16-2",
        "title": "Why can an ordinary BST search take O(n)?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why can an ordinary BST search take O(n)?",
        "answer": "Sorted insertions may produce a chain of height n. Search costs O(h), not automatically O(log n). AVL and red-black trees maintain height O(log n) using balancing rules and rotations."
      },
      {
        "id": "16-3",
        "title": "How do AVL and red-black trees differ?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do AVL and red-black trees differ?",
        "answer": "AVL trees keep subtree heights within one at every node and are more strictly balanced. Red-black trees maintain color and black-height rules with looser balance. Both guarantee logarithmic search and updates; rotation and bookkeeping trade-offs differ."
      }
    ]
  },
  {
    "id": "17",
    "name": "Heaps & priority queues",
    "stage": "Data structures",
    "summary": "Top k, streaming values, scheduling, k-way merge.",
    "pattern": "Keep only the candidates you need.",
    "questions": [
      {
        "id": "17-1",
        "title": "Kth largest value",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return the kth largest value, counting duplicates as separate elements. Require 1 ≤ k ≤ len(nums).",
        "example": "[3,2,1,5,6,4], k=2 → 5",
        "answer": "Keep a min-heap of the largest k values seen. When a new value is larger than the root, replace the root. At the end, the smallest among those k values is the kth largest overall.",
        "code": "import heapq\n\ndef kth_largest(nums, k):\n    if not 1 <= k <= len(nums):\n        raise ValueError('invalid k')\n    heap = nums[:k]\n    heapq.heapify(heap)\n    for i in range(k, len(nums)):\n        if nums[i] > heap[0]:\n            heapq.heapreplace(heap, nums[i])\n    return heap[0]",
        "time": "O(n log(k+1))",
        "space": "O(k)",
        "pitfall": "A min-heap of all values gives the global minimum at the root, not the kth largest directly."
      },
      {
        "id": "17-2",
        "title": "Why is heap construction O(n)?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why is heap construction O(n)?",
        "answer": "Most nodes are near leaves and need little sifting. Summing work over node heights gives a convergent weighted series times n. Inserting n values one by one instead costs O(n log n)."
      },
      {
        "id": "17-3",
        "title": "Heap or fully sorted array for a stream?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Heap or fully sorted array for a stream?",
        "answer": "A heap supports updates and extremum extraction in O(log n), with O(1) access to its extremum. A sorted array supports binary search but insertion may shift O(n) elements. Choose based on required operations."
      },
      {
        "id": "17-4",
        "title": "Merge k sorted lists",
        "kind": "Coding",
        "difficulty": "Hard",
        "prompt": "Given k sorted Python lists, return one sorted list with all values. Empty lists are allowed.",
        "example": "[[1,4],[1,3,5],[2]] → [1,1,2,3,4,5]",
        "answer": "Put the first value of each nonempty list in a min-heap together with its source and position. Pop the minimum, append it, and push the next value from that same list.",
        "code": "import heapq\n\ndef merge_k_lists(lists):\n    heap = [(a[0], i, 0) for i, a in enumerate(lists) if a]\n    heapq.heapify(heap)\n    result = []\n    while heap:\n        value, source, position = heapq.heappop(heap)\n        result.append(value)\n        position += 1\n        if position < len(lists[source]):\n            heapq.heappush(heap, (lists[source][position], source, position))\n    return result",
        "time": "O(k + N log(k+1)), N total values",
        "space": "O(k) auxiliary; O(N) output",
        "pitfall": "Store source information with each heap value so you know which list to advance."
      }
    ]
  },
  {
    "id": "18",
    "name": "Tries",
    "stage": "Data structures",
    "summary": "Prefix trees, word boundaries, autocomplete.",
    "pattern": "Share common prefixes instead of repeating them.",
    "questions": [
      {
        "id": "18-1",
        "title": "Implement word and prefix search",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Support insert(word), search(word), and starts_with(prefix) for Python strings. Empty strings are supported.",
        "example": "Insert \"apple\": search(\"app\") → False; starts_with(\"app\") → True",
        "answer": "Each trie node maps characters to child nodes. A dedicated end marker distinguishes a stored word from a mere prefix. Walking a string takes one transition per character.",
        "code": "class Trie:\n    END = object()\n    def __init__(self):\n        self.root = {}\n\n    def insert(self, word):\n        node = self.root\n        for char in word:\n            node = node.setdefault(char, {})\n        node[self.END] = True\n\n    def _walk(self, text):\n        node = self.root\n        for char in text:\n            if char not in node:\n                return None\n            node = node[char]\n        return node\n\n    def search(self, word):\n        node = self._walk(word)\n        return node is not None and self.END in node\n\n    def starts_with(self, prefix):\n        return self._walk(prefix) is not None",
        "time": "O(L) expected per operation",
        "space": "O(total stored characters)",
        "pitfall": "A successful prefix walk does not imply the whole word was inserted; check the end marker."
      },
      {
        "id": "18-2",
        "title": "When is a trie useful compared with a hash set?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "When is a trie useful compared with a hash set?",
        "answer": "Both can test full-word membership. Tries additionally support prefix traversal and lexicographic exploration naturally. They can consume substantial memory because each node stores links."
      },
      {
        "id": "18-3",
        "title": "How would you add autocomplete suggestions?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How would you add autocomplete suggestions?",
        "answer": "Walk to the prefix node, then DFS its descendants, collecting words at end markers. Stop after the requested number of suggestions. For ranked suggestions, store or compute ranking information; plain DFS does not imply popularity order."
      }
    ]
  },
  {
    "id": "19",
    "name": "Graph traversal",
    "stage": "Graphs",
    "summary": "Adjacency lists, BFS, DFS, connected components.",
    "pattern": "Mark visited and define directed versus undirected edges.",
    "questions": [
      {
        "id": "19-1",
        "title": "Count connected components",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given n vertices numbered 0..n−1 and undirected edges with valid endpoints, return the number of connected components. Include isolated vertices.",
        "example": "n=5, edges=[(0,1),(1,2),(3,4)] → 2",
        "answer": "Build adjacency lists. For each unvisited vertex, start a DFS and mark its reachable component. Each new DFS start increases the component count.",
        "code": "def components(n, edges):\n    graph = [[] for _ in range(n)]\n    for u, v in edges:\n        graph[u].append(v)\n        graph[v].append(u)\n    seen = set()\n    count = 0\n    for start in range(n):\n        if start in seen:\n            continue\n        count += 1\n        seen.add(start)\n        stack = [start]\n        while stack:\n            node = stack.pop()\n            for neighbor in graph[node]:\n                if neighbor not in seen:\n                    seen.add(neighbor)\n                    stack.append(neighbor)\n    return count",
        "time": "O(V + E)",
        "space": "O(V + E), including adjacency storage",
        "pitfall": "Starting DFS from only vertex zero misses disconnected components."
      },
      {
        "id": "19-2",
        "title": "When does BFS find shortest paths?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "When does BFS find shortest paths?",
        "answer": "BFS finds minimum-edge-count paths in an unweighted graph, or when every edge has the same positive weight. Arbitrary nonnegative weights require an algorithm such as Dijkstra."
      },
      {
        "id": "19-3",
        "title": "How do you detect a graph cycle?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you detect a graph cycle?",
        "answer": "In undirected DFS, a visited neighbor other than the parent signals a cycle in a simple graph. In directed DFS, use states unvisited/active/finished; an edge to an active node signals a directed cycle. Multigraphs need edge identity handling."
      },
      {
        "id": "19-4",
        "title": "Shortest path in an unweighted graph",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given adjacency lists for vertices 0..n−1 and valid start/target vertices, return one shortest path as a list of vertices, or [] if unreachable.",
        "example": "graph=[[1,2],[3],[3],[]], start=0, target=3 → [0,1,3]",
        "answer": "Use BFS and store a parent the first time each vertex is discovered. The first discovery gives the minimum number of edges. Reconstruct by following parents from target back to start.",
        "code": "from collections import deque\n\ndef shortest_unweighted(graph, start, target):\n    parent = {start: None}\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        if node == target:\n            path = []\n            while node is not None:\n                path.append(node)\n                node = parent[node]\n            return path[::-1]\n        for neighbor in graph[node]:\n            if neighbor not in parent:\n                parent[neighbor] = node\n                queue.append(neighbor)\n    return []",
        "time": "O(V + E)",
        "space": "O(V), including parents, queue, and path",
        "pitfall": "Mark vertices on discovery, not after repeatedly queuing them. Weighted graphs need a different shortest-path rule."
      }
    ]
  },
  {
    "id": "20",
    "name": "Topological ordering",
    "stage": "Graphs",
    "summary": "DAGs, indegrees, dependencies, cycle detection.",
    "pattern": "Process only nodes whose prerequisites are finished.",
    "questions": [
      {
        "id": "20-1",
        "title": "Order course prerequisites",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given n courses and pairs (course, prerequisite), return a valid course order, or [] if a cycle prevents completion. Endpoints are valid course IDs.",
        "example": "n=3, [(1,0),(2,1)] → [0,1,2]",
        "answer": "Kahn’s algorithm enqueues all zero-indegree courses. Remove one, append it to the order, and reduce its dependents’ indegrees. If fewer than n are processed, a cycle exists.",
        "code": "from collections import deque\n\ndef course_order(n, prerequisites):\n    graph = [[] for _ in range(n)]\n    indegree = [0] * n\n    for course, prerequisite in prerequisites:\n        graph[prerequisite].append(course)\n        indegree[course] += 1\n    queue = deque(i for i in range(n) if indegree[i] == 0)\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            indegree[neighbor] -= 1\n            if indegree[neighbor] == 0:\n                queue.append(neighbor)\n    return order if len(order) == n else []",
        "time": "O(V + E)",
        "space": "O(V + E)",
        "pitfall": "An edge must go from prerequisite to course, not the reverse."
      },
      {
        "id": "20-2",
        "title": "Does every directed graph have a topological order?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Does every directed graph have a topological order?",
        "answer": "No. A topological order exists exactly when the directed graph is acyclic. A cycle would require some vertex to precede itself through its dependency chain."
      },
      {
        "id": "20-3",
        "title": "Is a topological order unique?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Is a topological order unique?",
        "answer": "Not necessarily. In Kahn’s algorithm, multiple available zero-indegree vertices allow different valid choices. A unique order has only one available choice at every step."
      }
    ]
  },
  {
    "id": "21",
    "name": "Shortest paths",
    "stage": "Graphs",
    "summary": "Dijkstra, relaxation, stale heap entries, negative edges.",
    "pattern": "Choose the algorithm according to edge weights.",
    "questions": [
      {
        "id": "21-1",
        "title": "Dijkstra’s shortest distances",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given n vertices, directed edges (u,v,w) with nonnegative weights, and a valid start, return distances. Unreachable vertices have float(\"inf\").",
        "example": "n=3, [(0,1,4),(0,2,1),(2,1,2)], start=0 → [0,3,1]",
        "answer": "Keep tentative distances and pop the smallest from a heap. Relax outgoing edges and push improved distances. Skip entries whose distance no longer matches the best known value.",
        "code": "import heapq\n\ndef dijkstra(n, edges, start):\n    graph = [[] for _ in range(n)]\n    for u, v, weight in edges:\n        if weight < 0:\n            raise ValueError('negative edge')\n        graph[u].append((v, weight))\n    distance = [float('inf')] * n\n    distance[start] = 0\n    heap = [(0, start)]\n    while heap:\n        current, node = heapq.heappop(heap)\n        if current != distance[node]:\n            continue\n        for neighbor, weight in graph[node]:\n            candidate = current + weight\n            if candidate < distance[neighbor]:\n                distance[neighbor] = candidate\n                heapq.heappush(heap, (candidate, neighbor))\n    return distance",
        "time": "O(V + E log(E+1)) with lazy heap entries",
        "space": "O(V + E)",
        "pitfall": "Dijkstra’s correctness requires nonnegative weights; do not use it unchanged for negative edges."
      },
      {
        "id": "21-2",
        "title": "When do you use Bellman–Ford or Floyd–Warshall?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "When do you use Bellman–Ford or Floyd–Warshall?",
        "answer": "Bellman–Ford solves single-source shortest paths with negative edges and detects reachable negative cycles, in O(VE). Floyd–Warshall computes all-pairs distances in O(V³) time and O(V²) space, useful for smaller dense graphs."
      },
      {
        "id": "21-3",
        "title": "Why skip stale heap entries?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Why skip stale heap entries?",
        "answer": "The same vertex can be pushed after several improvements. An old larger-distance entry is redundant. Skipping it avoids rescanning outgoing edges unnecessarily; the current distance array is the authority."
      }
    ]
  },
  {
    "id": "22",
    "name": "Disjoint sets & MST",
    "stage": "Graphs",
    "summary": "Union-find, path compression, union by size, Kruskal.",
    "pattern": "Merge components without exploring every path again.",
    "questions": [
      {
        "id": "22-1",
        "title": "Minimum spanning tree cost",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given n≥1 vertices and undirected weighted edges, return MST total cost or None if disconnected. Negative weights are allowed.",
        "example": "n=3, [(0,1,4),(0,2,1),(1,2,2)] → 3",
        "answer": "Kruskal sorts edges by weight. Use a disjoint-set structure to accept an edge only when its endpoints belong to different components. Stop after n−1 accepted edges.",
        "code": "def mst_cost(n, edges):\n    parent = list(range(n))\n    size = [1] * n\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    total = used = 0\n    for u, v, weight in sorted(edges, key=lambda e: e[2]):\n        a, b = find(u), find(v)\n        if a == b:\n            continue\n        if size[a] < size[b]:\n            a, b = b, a\n        parent[b] = a\n        size[a] += size[b]\n        total += weight\n        used += 1\n        if used == n - 1:\n            break\n    return total if used == n - 1 else None",
        "time": "O(V + E log(E+1))",
        "space": "O(V + E), including sorted edge copy",
        "pitfall": "A minimum spanning tree minimizes total connecting-edge weight; it is not a shortest-path tree from a source."
      },
      {
        "id": "22-2",
        "title": "What do path compression and union by size achieve?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What do path compression and union by size achieve?",
        "answer": "Compression shortens parent paths during find. Union by size attaches the smaller component beneath the larger. Together they give amortized O(α(n)) per operation, where α grows extremely slowly."
      },
      {
        "id": "22-3",
        "title": "What is the MST cut property?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "What is the MST cut property?",
        "answer": "For any partition of vertices into two sets, a minimum-weight edge crossing the cut is safe to include in some MST. This supports the greedy correctness of Kruskal and Prim."
      }
    ]
  },
  {
    "id": "23",
    "name": "Greedy algorithms",
    "stage": "Core patterns",
    "summary": "Local choice, exchange arguments, feasibility.",
    "pattern": "Prove a local choice preserves an optimal answer.",
    "questions": [
      {
        "id": "23-1",
        "title": "Maximum non-overlapping activities",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given activities (start,end) with start<end, return the maximum number you can attend. An activity starting exactly when another ends is compatible.",
        "example": "[(1,3),(2,4),(3,5),(5,7)] → 3",
        "answer": "Sort by finish time. Choose the earliest-finishing compatible activity repeatedly. Replacing an optimal solution’s first choice with an earlier-finishing one cannot reduce remaining opportunities.",
        "code": "def max_activities(intervals):\n    last_end = float('-inf')\n    count = 0\n    for start, end in sorted(intervals, key=lambda p: p[1]):\n        if start >= last_end:\n            count += 1\n            last_end = end\n    return count",
        "time": "O(n log n)",
        "space": "O(n), sorting copy",
        "pitfall": "Sorting by earliest start or shortest duration does not generally maximize the count."
      },
      {
        "id": "23-2",
        "title": "How do you justify a greedy algorithm in an interview?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How do you justify a greedy algorithm in an interview?",
        "answer": "State the exact greedy choice and prove it is safe, often with an exchange argument or stays-ahead argument. A plausible rule and successful examples are not a correctness proof."
      },
      {
        "id": "23-3",
        "title": "Why does greedy fail for general coin change?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Why does greedy fail for general coin change?",
        "answer": "With coins [1,3,4] and amount 6, taking the largest first gives 4+1+1, three coins. The optimum is 3+3, two coins. General denominations require a method such as dynamic programming."
      }
    ]
  },
  {
    "id": "24",
    "name": "Intervals",
    "stage": "Core patterns",
    "summary": "Merging, overlap rules, scheduling, sweep lines.",
    "pattern": "Sort endpoints, then define whether touching counts.",
    "questions": [
      {
        "id": "24-1",
        "title": "Merge overlapping intervals",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given closed intervals [start,end] with start≤end, merge overlapping or touching intervals. Return sorted disjoint intervals.",
        "example": "[[1,3],[2,6],[8,10],[10,12]] → [[1,6],[8,12]]",
        "answer": "Sort by start. Compare each interval with the last merged one. If it overlaps or touches, extend the end; otherwise start a new merged interval.",
        "code": "def merge_intervals(intervals):\n    result = []\n    for start, end in sorted(intervals):\n        if not result or start > result[-1][1]:\n            result.append([start, end])\n        else:\n            result[-1][1] = max(result[-1][1], end)\n    return result",
        "time": "O(n log n)",
        "space": "O(n)",
        "pitfall": "For half-open intervals, touching endpoints may be compatible instead of overlapping. Clarify the problem’s convention."
      },
      {
        "id": "24-2",
        "title": "How do you find the minimum number of meeting rooms?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How do you find the minimum number of meeting rooms?",
        "answer": "Sort starts and ends and sweep events, tracking active meetings, or use a min-heap of end times. If a meeting ending at t frees a room for one starting at t, process the end first on ties."
      },
      {
        "id": "24-3",
        "title": "How are interval union and intersection different?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How are interval union and intersection different?",
        "answer": "Union covers every point present in either collection; merging computes it. Intersection keeps only points covered by both. For two sorted disjoint lists, two pointers can compute intersections in O(n+m)."
      }
    ]
  },
  {
    "id": "25",
    "name": "Dynamic programming · 1D",
    "stage": "Dynamic programming",
    "summary": "State, transition, base cases, memoization, tabulation.",
    "pattern": "Describe what dp[i] means before writing the loop.",
    "questions": [
      {
        "id": "25-1",
        "title": "Minimum coins for an amount",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given positive integer denominations and nonnegative amount, return the fewest coins needed with unlimited reuse, or −1 if impossible.",
        "example": "coins=[1,3,4], amount=6 → 2",
        "answer": "dp[total] is the minimum coins for that total. For every usable coin, try one coin plus the best solution for total−coin. Unreachable states remain infinity.",
        "code": "def min_coins(coins, amount):\n    if amount < 0 or any(c <= 0 for c in coins):\n        raise ValueError('invalid amount or coin')\n    dp = [0] + [float('inf')] * amount\n    for total in range(1, amount + 1):\n        for coin in coins:\n            if coin <= total:\n                dp[total] = min(dp[total], 1 + dp[total - coin])\n    return -1 if dp[amount] == float('inf') else dp[amount]",
        "time": "O(amount × number of coins)",
        "space": "O(amount)",
        "pitfall": "Zero or negative coin values violate this recurrence’s dependency order."
      },
      {
        "id": "25-2",
        "title": "When is a problem a candidate for DP?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "When is a problem a candidate for DP?",
        "answer": "Look for overlapping subproblems and a state that summarizes everything future decisions need. Optimization problems often also use optimal substructure. Define state, transitions, base cases, evaluation order, and final answer."
      },
      {
        "id": "25-3",
        "title": "Memoization or tabulation?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "Memoization or tabulation?",
        "answer": "Memoization computes needed states on demand and follows recursive structure, but uses a call stack. Tabulation explicitly orders dependencies and often makes space optimization easier. Both must avoid recomputing the same state."
      },
      {
        "id": "25-4",
        "title": "House Robber",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given nonnegative rewards in a line, return the maximum sum obtainable without choosing adjacent positions. Empty input returns zero.",
        "example": "[2,7,9,3,1] → 12",
        "answer": "For each position either skip it, retaining the best previous answer, or take it together with the best answer two positions back. Only two earlier states are needed.",
        "code": "def rob(nums):\n    two_back = one_back = 0\n    for reward in nums:\n        two_back, one_back = one_back, max(one_back, two_back + reward)\n    return one_back",
        "time": "O(n)",
        "space": "O(1)",
        "pitfall": "For houses arranged in a circle, first and last also conflict; solve two linear ranges excluding one endpoint each."
      },
      {
        "id": "25-5",
        "title": "Longest increasing subsequence",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return the length of a strictly increasing subsequence. Input values may repeat.",
        "example": "[10,9,2,5,3,7,101,18] → 4",
        "answer": "Use the quadratic DP first: dp[i] is the longest increasing subsequence ending at i. Try every earlier smaller value as the predecessor. The final answer is the maximum dp entry.",
        "code": "def lis_length(nums):\n    dp = [1] * len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp, default=0)",
        "time": "O(n²)",
        "space": "O(n)",
        "pitfall": "Use < for strictly increasing. An O(n log n) improvement maintains minimum tail values and replaces the first tail ≥ the current value with binary search."
      }
    ]
  },
  {
    "id": "26",
    "name": "Dynamic programming · 2D",
    "stage": "Dynamic programming",
    "summary": "Subsequence DP, grid states, knapsack, rolling rows.",
    "pattern": "Choose states from two independent positions or capacities.",
    "questions": [
      {
        "id": "26-1",
        "title": "Longest common subsequence length",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return the length of a longest subsequence common to two strings. Characters need not be contiguous.",
        "example": "\"abcde\" and \"ace\" → 3",
        "answer": "Let a state describe prefixes of both strings. If their final characters match, use one plus the diagonal. Otherwise use the best result after dropping one final character. Keep only the previous row.",
        "code": "def lcs_length(a, b):\n    previous = [0] * (len(b) + 1)\n    for x in a:\n        current = [0]\n        for j, y in enumerate(b, 1):\n            if x == y:\n                current.append(previous[j - 1] + 1)\n            else:\n                current.append(max(previous[j], current[-1]))\n        previous = current\n    return previous[-1]",
        "time": "O(mn)",
        "space": "O(n), n=len(b)",
        "pitfall": "Longest common substring is a different problem: a mismatch resets a contiguous match length."
      },
      {
        "id": "26-2",
        "title": "Why does 0/1 knapsack iterate capacity downward in a 1D table?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why does 0/1 knapsack iterate capacity downward in a 1D table?",
        "answer": "Descending order ensures dp[capacity−weight] still belongs to the previous item stage, so the item is used at most once. Ascending order allows the current item to be reused, matching unbounded knapsack."
      },
      {
        "id": "26-3",
        "title": "What do you lose with rolling-row space optimization?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "What do you lose with rolling-row space optimization?",
        "answer": "You keep the final score but discard most reconstruction information. To recover an actual LCS or chosen items, retain parent decisions, retain the table, or use a more advanced reconstruction technique."
      },
      {
        "id": "26-4",
        "title": "0/1 knapsack",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given equal-length weights and values lists, positive integer weights, and a nonnegative integer capacity, maximize total value. Each item can be chosen at most once; choosing nothing is allowed.",
        "example": "weights=[2,3,4], values=[4,5,6], capacity=5 → 9",
        "answer": "Use dp[c] for the best value within capacity c. For each item, iterate capacities downward and compare skipping it with taking it plus the previous-stage answer for c−weight.",
        "code": "def knapsack(weights, values, capacity):\n    dp = [0] * (capacity + 1)\n    for weight, value in zip(weights, values):\n        for c in range(capacity, weight - 1, -1):\n            dp[c] = max(dp[c], dp[c - weight] + value)\n    return dp[capacity]",
        "time": "O(n × capacity)",
        "space": "O(capacity)",
        "pitfall": "An ascending capacity loop would permit repeated use of the same item and solve an unbounded variant instead."
      },
      {
        "id": "26-5",
        "title": "Edit distance",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Return the minimum number of single-character insertions, deletions, and replacements needed to transform a into b. Each operation costs one.",
        "example": "\"horse\" → \"ros\" requires 3 edits",
        "answer": "Use prefix states. Equal final characters inherit the diagonal cost. Otherwise take one plus the minimum of deletion, insertion, and replacement. Initialize transforming to or from an empty prefix.",
        "code": "def edit_distance(a, b):\n    previous = list(range(len(b) + 1))\n    for i, x in enumerate(a, 1):\n        current = [i]\n        for j, y in enumerate(b, 1):\n            if x == y:\n                current.append(previous[j - 1])\n            else:\n                current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))\n        previous = current\n    return previous[-1]",
        "time": "O(mn)",
        "space": "O(n), n=len(b)",
        "pitfall": "The empty-prefix base row and column are lengths, not zeros."
      }
    ]
  },
  {
    "id": "27",
    "name": "Bit manipulation",
    "stage": "Core patterns",
    "summary": "XOR identities, bit masks, shifts, set-bit operations.",
    "pattern": "Use bit operations only when the input guarantees justify them.",
    "questions": [
      {
        "id": "27-1",
        "title": "Single number",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Every integer occurs exactly twice except one occurring once. Return that single integer. The input is nonempty.",
        "example": "[4,1,2,1,2] → 4",
        "answer": "XOR all numbers. Since x XOR x is zero and x XOR zero is x, pairs cancel. XOR is associative and commutative, so order does not matter.",
        "code": "def single_number(nums):\n    answer = 0\n    for value in nums:\n        answer ^= value\n    return answer",
        "time": "O(n) fixed-width operations",
        "space": "O(1) fixed-width auxiliary space",
        "pitfall": "The rule fails when repeated values occur three times or several values are unpaired. Python integers also have variable bit length."
      },
      {
        "id": "27-2",
        "title": "What does x & (x−1) do?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "What does x & (x−1) do?",
        "answer": "For a positive integer x, it clears its least significant set bit. Repeating until zero counts set bits in O(number of set bits) operations. A positive power of two satisfies x & (x−1)==0."
      },
      {
        "id": "27-3",
        "title": "How do you use a bit mask to represent a subset?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you use a bit mask to represent a subset?",
        "answer": "Bit i indicates whether element i is included. Test with mask & (1<<i), add with mask | (1<<i), and remove with mask & ~(1<<i). Enumerating all masks takes 2^n possibilities."
      }
    ]
  },
  {
    "id": "28",
    "name": "Math & number algorithms",
    "stage": "Foundation",
    "summary": "GCD, primes, modular arithmetic, overflow assumptions.",
    "pattern": "Exploit mathematical structure instead of brute force.",
    "questions": [
      {
        "id": "28-1",
        "title": "Greatest common divisor",
        "kind": "Coding",
        "difficulty": "Easy",
        "prompt": "Return the nonnegative GCD of two integers. Use gcd(0,0)=0. Negative inputs are allowed.",
        "example": "48,18 → 6",
        "answer": "Euclid’s identity says gcd(a,b)=gcd(b,a mod b). Repeatedly apply it until the second value becomes zero, then the first value is the GCD.",
        "code": "def gcd(a, b):\n    a, b = abs(a), abs(b)\n    while b:\n        a, b = b, a % b\n    return a",
        "time": "O(log(min(|a|,|b|)+1)) remainder steps for nonzero inputs",
        "space": "O(1) integer variables",
        "pitfall": "Modulo and multiplication costs grow with integer bit length; the step count is not a full bit-complexity analysis."
      },
      {
        "id": "28-2",
        "title": "Why test primality only up to the square root?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why test primality only up to the square root?",
        "answer": "If n=a×b is composite, at least one factor is at most √n; otherwise their product would exceed n. Handle n<2 and small even values first."
      },
      {
        "id": "28-3",
        "title": "When should you use a sieve of Eratosthenes?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "When should you use a sieve of Eratosthenes?",
        "answer": "When finding many primes up to a limit N. Mark multiples starting at p² for each unmarked p up to √N. Standard complexity is O(N log log N) time and O(N) space."
      }
    ]
  },
  {
    "id": "29",
    "name": "Matrices & grids",
    "stage": "Core patterns",
    "summary": "Grid neighbors, flood fill, boundary checks, visited state.",
    "pattern": "Treat each valid cell as a graph vertex.",
    "questions": [
      {
        "id": "29-1",
        "title": "Count islands",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "Given a rectangular grid of \"0\" and \"1\" characters, count 4-directionally connected land components. Do not modify the input.",
        "example": "[[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]] → 2",
        "answer": "Scan every cell. For each unseen land cell, start a flood fill using a stack. Mark cells when adding them to prevent repeated work. Each flood fill is one island.",
        "code": "def num_islands(grid):\n    if not grid or not grid[0]:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    seen = set()\n    answer = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] != '1' or (r, c) in seen:\n                continue\n            answer += 1\n            seen.add((r, c))\n            stack = [(r, c)]\n            while stack:\n                x, y = stack.pop()\n                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):\n                    nx, ny = x + dx, y + dy\n                    if (0 <= nx < rows and 0 <= ny < cols\n                            and grid[nx][ny] == '1'\n                            and (nx, ny) not in seen):\n                        seen.add((nx, ny))\n                        stack.append((nx, ny))\n    return answer",
        "time": "O(rows × cols)",
        "space": "O(rows × cols)",
        "pitfall": "Diagonal cells do not connect in a 4-direction problem. Clarify 4 versus 8 directions."
      },
      {
        "id": "29-2",
        "title": "How do you rotate a square matrix 90° clockwise in place?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How do you rotate a square matrix 90° clockwise in place?",
        "answer": "Transpose across the main diagonal, then reverse each row. This takes O(n²) time and can use O(1) extra space with element swaps. The same operation is not an in-place shape-preserving rotation for a nonsquare matrix."
      },
      {
        "id": "29-3",
        "title": "How does multi-source BFS work on a grid?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How does multi-source BFS work on a grid?",
        "answer": "Enqueue all starting cells at distance zero before processing. BFS expands simultaneous layers, finding each cell’s distance to its closest source in an unweighted grid. This fits nearest-zero and spreading-process problems."
      },
      {
        "id": "29-4",
        "title": "Unique paths with obstacles",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "A rectangular grid contains 0 for open cells and 1 for blocked cells. Count paths from top-left to bottom-right moving only right or down.",
        "example": "[[0,0,0],[0,1,0],[0,0,0]] → 2",
        "answer": "In a rolling row, dp[c] initially represents paths from above and dp[c−1] represents paths from the left. A blocked cell resets its path count to zero.",
        "code": "def unique_paths(grid):\n    if not grid or not grid[0]:\n        return 0\n    dp = [0] * len(grid[0])\n    dp[0] = 1\n    for row in grid:\n        for c, blocked in enumerate(row):\n            if blocked:\n                dp[c] = 0\n            elif c > 0:\n                dp[c] += dp[c - 1]\n    return dp[-1]",
        "time": "O(rows × cols) arithmetic operations",
        "space": "O(cols)",
        "pitfall": "A blocked start or destination must give zero. Large path counts increase Python integer arithmetic costs."
      }
    ]
  },
  {
    "id": "30",
    "name": "Monotonic stacks & deques",
    "stage": "Advanced patterns",
    "summary": "Next greater element, daily temperatures, window extrema.",
    "pattern": "Discard candidates that can never be useful again.",
    "questions": [
      {
        "id": "30-1",
        "title": "Days until a warmer temperature",
        "kind": "Coding",
        "difficulty": "Medium",
        "prompt": "For each temperature, return how many days until a strictly warmer one. Use zero if no later warmer day exists.",
        "example": "[73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]",
        "answer": "Keep unresolved indices in a decreasing-temperature stack. A warmer current day resolves every smaller temperature at the top. Each index is pushed and popped at most once.",
        "code": "def daily_temperatures(temps):\n    result = [0] * len(temps)\n    stack = []\n    for i, temperature in enumerate(temps):\n        while stack and temps[stack[-1]] < temperature:\n            previous = stack.pop()\n            result[previous] = i - previous\n        stack.append(i)\n    return result",
        "time": "O(n)",
        "space": "O(n)",
        "pitfall": "Use strictly less than, not less than or equal, because equal temperatures are not warmer."
      },
      {
        "id": "30-2",
        "title": "How can a nested while loop still be O(n)?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "How can a nested while loop still be O(n)?",
        "answer": "Count aggregate operations. In a monotonic stack, each index enters once and leaves at most once. Although one iteration may pop many entries, all pops across the whole algorithm total at most n."
      },
      {
        "id": "30-3",
        "title": "How do you compute every window maximum in O(n)?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you compute every window maximum in O(n)?",
        "answer": "Maintain a deque of indices with decreasing values. Remove expired indices from the front and dominated values from the back; append the new index. The front gives the maximum once the window reaches length k."
      },
      {
        "id": "30-4",
        "title": "Sliding-window maximum",
        "kind": "Coding",
        "difficulty": "Hard",
        "prompt": "Given an integer list and 1≤k≤n, return the maximum value for each contiguous length-k window.",
        "example": "[1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]",
        "answer": "Maintain indices in a deque, with values decreasing from front to back. Expire old indices, remove dominated candidates, then append the new index. The front is each completed window’s maximum.",
        "code": "from collections import deque\n\ndef window_maximum(nums, k):\n    if not 1 <= k <= len(nums):\n        raise ValueError('invalid window size')\n    candidates, result = deque(), []\n    for i, value in enumerate(nums):\n        while candidates and candidates[0] <= i - k:\n            candidates.popleft()\n        while candidates and nums[candidates[-1]] <= value:\n            candidates.pop()\n        candidates.append(i)\n        if i >= k - 1:\n            result.append(nums[candidates[0]])\n    return result",
        "time": "O(n)",
        "space": "O(k) auxiliary plus output",
        "pitfall": "Store indices, not only values, because expiration depends on position."
      }
    ]
  },
  {
    "id": "31",
    "name": "Range queries",
    "stage": "Advanced patterns",
    "summary": "Fenwick trees, segment trees, updates and aggregation.",
    "pattern": "Store reusable aggregates over structured ranges.",
    "questions": [
      {
        "id": "31-1",
        "title": "Fenwick tree for point additions and range sums",
        "kind": "Coding",
        "difficulty": "Hard",
        "prompt": "Create a zero-filled structure of size n. add(index,delta) uses zero-based indices. prefix(end) sums [0,end); range_sum(left,right) sums [left,right). Require valid bounds.",
        "example": "n=5; add(1,3); add(3,7); range_sum(1,4) → 10",
        "answer": "The internal tree is one-based. Each entry stores a block ending at that index. Updating climbs by i&−i; prefix queries descend by the same least significant set bit.",
        "code": "class Fenwick:\n    def __init__(self, n):\n        self.n = n\n        self.tree = [0] * (n + 1)\n\n    def add(self, index, delta):\n        if not 0 <= index < self.n:\n            raise IndexError('invalid index')\n        i = index + 1\n        while i <= self.n:\n            self.tree[i] += delta\n            i += i & -i\n\n    def prefix(self, end):\n        if not 0 <= end <= self.n:\n            raise IndexError('invalid end')\n        total = 0\n        while end:\n            total += self.tree[end]\n            end -= end & -end\n        return total\n\n    def range_sum(self, left, right):\n        if not 0 <= left <= right <= self.n:\n            raise IndexError('invalid range')\n        return self.prefix(right) - self.prefix(left)",
        "time": "O(log n) per update/query; O(n) initialization",
        "space": "O(n)",
        "pitfall": "Internal index zero cannot be used for update traversal: i & −i would be zero and the loop would not advance."
      },
      {
        "id": "31-2",
        "title": "Fenwick tree or segment tree?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Fenwick tree or segment tree?",
        "answer": "Fenwick trees are compact and convenient for prefix sums with point updates. Segment trees support more general associative aggregates such as minimum, maximum, GCD, and custom state; both commonly support O(log n) queries and updates."
      },
      {
        "id": "31-3",
        "title": "What is lazy propagation?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "What is lazy propagation?",
        "answer": "A segment-tree node stores a pending range update without immediately touching every descendant. Push that update when descending. Compatible range updates and aggregate queries can then take O(log n), but the combination rules must be correct."
      }
    ]
  },
  {
    "id": "32",
    "name": "Data structure design · LRU",
    "stage": "Advanced patterns",
    "summary": "Hash maps plus linked ordering, API contracts, invariants.",
    "pattern": "Combine structures so every required operation stays fast.",
    "questions": [
      {
        "id": "32-1",
        "title": "Least recently used cache",
        "kind": "Coding",
        "difficulty": "Hard",
        "prompt": "Implement get(key) and put(key,value) with fixed nonnegative capacity. get returns −1 if missing. Accessing or updating a key makes it most recently used. Evict the least recent key when full.",
        "example": "capacity=2; put(1,10), put(2,20), get(1), put(3,30) evicts key 2",
        "answer": "Use an OrderedDict as a hash map with maintained recency order. Move accesses to the end and evict from the beginning. In an interview without this utility, use a hash map pointing to nodes in a doubly linked list.",
        "code": "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        if capacity < 0:\n            raise ValueError('negative capacity')\n        self.capacity = capacity\n        self.items = OrderedDict()\n\n    def get(self, key):\n        if key not in self.items:\n            return -1\n        self.items.move_to_end(key)\n        return self.items[key]\n\n    def put(self, key, value):\n        self.items[key] = value\n        self.items.move_to_end(key)\n        if len(self.items) > self.capacity:\n            self.items.popitem(last=False)",
        "time": "O(1) expected per operation",
        "space": "O(capacity)",
        "pitfall": "Updating an existing key must also refresh its recency. A zero-capacity cache must retain nothing."
      },
      {
        "id": "32-2",
        "title": "Why combine a hash map with a doubly linked list?",
        "kind": "Interview Q&A",
        "difficulty": "Easy",
        "prompt": "Why combine a hash map with a doubly linked list?",
        "answer": "The map finds a key’s node in expected O(1). The doubly linked list removes or moves that known node in O(1) and exposes the least recent endpoint. A singly linked list cannot generally unlink a known node without its predecessor."
      },
      {
        "id": "32-3",
        "title": "How do you test an LRU cache?",
        "kind": "Interview Q&A",
        "difficulty": "Medium",
        "prompt": "How do you test an LRU cache?",
        "answer": "Check missing reads, repeated reads, updating an existing key, eviction after a read changes recency, capacities zero and one, and values equal to the missing sentinel. Clarify the API if −1 can also be a stored value."
      }
    ]
  }
];
