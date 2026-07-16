const fs = require('fs');
const path = require('path');

const javaData = [
  {
    "id": "java_1",
    "question": "Which of the following is not a Java features?",
    "options": ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"],
    "correctAnswer": "Use of pointers",
    "explanation": "Java doesn't support pointers to avoid security issues and complexity.",
    "difficulty": "Easy",
    "topic": "Core Java"
  },
  {
    "id": "java_2",
    "question": "What is the return type of the hashCode() method in the Object class?",
    "options": ["int", "Object", "long", "void"],
    "correctAnswer": "int",
    "explanation": "The hashCode() method returns an integer value representing the memory address or a unique hash of the object.",
    "difficulty": "Easy",
    "topic": "Core Java"
  },
  {
    "id": "java_3",
    "question": "Which of these collections allow null as a key?",
    "options": ["TreeMap", "HashMap", "Hashtable", "ConcurrentHashMap"],
    "correctAnswer": "HashMap",
    "explanation": "HashMap allows one null key and multiple null values, whereas TreeMap, Hashtable, and ConcurrentHashMap do not allow null keys.",
    "difficulty": "Medium",
    "topic": "Collections"
  },
  {
    "id": "java_4",
    "question": "What happens if we call start() method twice on the same Thread instance?",
    "options": ["Thread starts executing again", "Throws IllegalThreadStateException", "Nothing happens", "Throws InterruptedException"],
    "correctAnswer": "Throws IllegalThreadStateException",
    "explanation": "A thread can only be started once. Calling start() again on an already started thread throws java.lang.IllegalThreadStateException.",
    "difficulty": "Medium",
    "topic": "Multithreading"
  },
  {
    "id": "java_5",
    "question": "Which keyword is used to prevent a class from being subclassed?",
    "options": ["static", "const", "final", "abstract"],
    "correctAnswer": "final",
    "explanation": "The final keyword applied to a class prevents it from being extended (subclassed).",
    "difficulty": "Easy",
    "topic": "OOPs"
  },
  {
    "id": "java_6",
    "question": "Which method is used to perform intermediate operations on a Stream in Java 8?",
    "options": ["collect()", "forEach()", "map()", "reduce()"],
    "correctAnswer": "map()",
    "explanation": "map() is an intermediate operation. collect(), forEach(), and reduce() are terminal operations.",
    "difficulty": "Medium",
    "topic": "Streams"
  },
  {
    "id": "java_7",
    "question": "In Java, what is the default value of a local variable?",
    "options": ["null", "0", "Garbage value", "No default value (compilation error if used uninitialized)"],
    "correctAnswer": "No default value (compilation error if used uninitialized)",
    "explanation": "Local variables in Java must be initialized before use, they do not get default values.",
    "difficulty": "Medium",
    "topic": "Core Java"
  },
  {
    "id": "java_8",
    "question": "Which of these exception classes is unchecked?",
    "options": ["IOException", "SQLException", "NullPointerException", "ClassNotFoundException"],
    "correctAnswer": "NullPointerException",
    "explanation": "NullPointerException extends RuntimeException, making it an unchecked exception.",
    "difficulty": "Medium",
    "topic": "Exceptions"
  },
  {
    "id": "java_9",
    "question": "What is the purpose of the 'transient' keyword in Java?",
    "options": ["To make a variable accessible only within the same package", "To prevent a variable from being serialized", "To indicate a method is synchronized", "To make a variable thread-safe"],
    "correctAnswer": "To prevent a variable from being serialized",
    "explanation": "The transient keyword indicates that a variable should not be included when the object is serialized.",
    "difficulty": "Hard",
    "topic": "Core Java"
  },
  {
    "id": "java_10",
    "question": "Which design pattern is implemented by java.lang.Runtime?",
    "options": ["Factory", "Singleton", "Observer", "Decorator"],
    "correctAnswer": "Singleton",
    "explanation": "The Runtime class uses the Singleton design pattern. There is only one instance of Runtime in a Java application.",
    "difficulty": "Hard",
    "topic": "Design Patterns"
  },
  {
    "id": "java_11",
    "question": "Which block is always executed whether an exception is handled or not?",
    "options": ["try", "catch", "finally", "throw"],
    "correctAnswer": "finally",
    "explanation": "The finally block always executes regardless of whether an exception occurred or was handled.",
    "difficulty": "Easy",
    "topic": "Exceptions"
  },
  {
    "id": "java_12",
    "question": "What is the size of boolean variable in Java?",
    "options": ["1 bit", "8 bits", "16 bits", "Depends on JVM"],
    "correctAnswer": "Depends on JVM",
    "explanation": "The size of boolean is not precisely defined by the Java specification and is JVM dependent.",
    "difficulty": "Medium",
    "topic": "Core Java"
  },
  {
    "id": "java_13",
    "question": "Which collection provides ordered iteration based on insertion order?",
    "options": ["HashSet", "TreeSet", "LinkedHashSet", "PriorityQueue"],
    "correctAnswer": "LinkedHashSet",
    "explanation": "LinkedHashSet maintains a doubly-linked list running through all of its entries to define the iteration ordering.",
    "difficulty": "Medium",
    "topic": "Collections"
  },
  {
    "id": "java_14",
    "question": "Can we override a static method in Java?",
    "options": ["Yes", "No", "Only if it is public", "Only in abstract classes"],
    "correctAnswer": "No",
    "explanation": "Static methods cannot be overridden because they are resolved at compile time (method hiding), not at runtime.",
    "difficulty": "Medium",
    "topic": "OOPs"
  },
  {
    "id": "java_15",
    "question": "What is the superclass of all classes in Java?",
    "options": ["Class", "Main", "Object", "System"],
    "correctAnswer": "Object",
    "explanation": "java.lang.Object is the root of the class hierarchy in Java.",
    "difficulty": "Easy",
    "topic": "Core Java"
  },
  {
    "id": "java_16",
    "question": "Which of the following is true about String in Java?",
    "options": ["Strings are mutable", "Strings are immutable", "Strings can only be created using the 'new' keyword", "Strings extend StringBuilder"],
    "correctAnswer": "Strings are immutable",
    "explanation": "String objects in Java are immutable; their values cannot be changed after creation.",
    "difficulty": "Easy",
    "topic": "Core Java"
  },
  {
    "id": "java_17",
    "question": "Which of these is not an interface in the Collections Framework?",
    "options": ["List", "Set", "Map", "Dictionary"],
    "correctAnswer": "Dictionary",
    "explanation": "Dictionary is an abstract class, not an interface. It is largely deprecated in favor of the Map interface.",
    "difficulty": "Medium",
    "topic": "Collections"
  },
  {
    "id": "java_18",
    "question": "What is autoboxing in Java?",
    "options": ["Converting primitive type to object wrapper class automatically", "Converting object wrapper class to primitive type automatically", "Automatically casting a subclass to a superclass", "None of the above"],
    "correctAnswer": "Converting primitive type to object wrapper class automatically",
    "explanation": "Autoboxing is the automatic conversion that the Java compiler makes between the primitive types and their corresponding object wrapper classes.",
    "difficulty": "Medium",
    "topic": "Core Java"
  },
  {
    "id": "java_19",
    "question": "Which interface should be implemented to create a thread in Java?",
    "options": ["Thread", "Runnable", "Callable", "Both Runnable and Callable"],
    "correctAnswer": "Both Runnable and Callable",
    "explanation": "Both Runnable (no return value) and Callable (returns a value) interfaces can be implemented to define thread tasks.",
    "difficulty": "Medium",
    "topic": "Multithreading"
  },
  {
    "id": "java_20",
    "question": "What does the 'volatile' keyword guarantee?",
    "options": ["Atomicity", "Visibility", "Mutual Exclusion", "All of the above"],
    "correctAnswer": "Visibility",
    "explanation": "The volatile keyword guarantees visibility of changes to variables across threads, but does not guarantee atomicity.",
    "difficulty": "Hard",
    "topic": "Multithreading"
  }
];

const codingData = [
  {
    "id": "coding_1",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "problem": {
      "title": "Two Sum",
      "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      "examples": [
        { "input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "note": "Because nums[0] + nums[1] == 9, we return [0, 1]." },
        { "input": "nums = [3,2,4], target = 6", "output": "[1,2]" }
      ],
      "constraints": [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9"
      ],
      "solution": "def twoSum(nums, target):\n    prevMap = {} # val : index\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[n] = i\n    return []"
    },
    "explanation": "Use a hash map to store the elements we have seen so far and their indices. For each element, check if the complement (target - element) exists in the hash map. Time Complexity: O(n), Space Complexity: O(n)."
  },
  {
    "id": "coding_2",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "problem": {
      "title": "Contains Duplicate",
      "description": "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
      "examples": [
        { "input": "nums = [1,2,3,1]", "output": "true" },
        { "input": "nums = [1,2,3,4]", "output": "false" }
      ],
      "constraints": [
        "1 <= nums.length <= 10^5",
        "-10^9 <= nums[i] <= 10^9"
      ],
      "solution": "def containsDuplicate(nums):\n    hashset = set()\n    for n in nums:\n        if n in hashset:\n            return True\n        hashset.add(n)\n    return False"
    },
    "explanation": "Use a hash set to keep track of seen elements. If we encounter an element already in the set, we found a duplicate. Time: O(n), Space: O(n)."
  },
  {
    "id": "coding_3",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "problem": {
      "title": "Valid Palindrome",
      "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
      "examples": [
        { "input": "s = \"A man, a plan, a canal: Panama\"", "output": "true", "note": "\"amanaplanacanalpanama\" is a palindrome." },
        { "input": "s = \"race a car\"", "output": "false" }
      ],
      "constraints": [
        "1 <= s.length <= 2 * 10^5",
        "s consists only of printable ASCII characters."
      ],
      "solution": "def isPalindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not alphaNum(s[l]):\n            l += 1\n        while l < r and not alphaNum(s[r]):\n            r -= 1\n        if s[l].lower() != s[r].lower():\n            return False\n        l += 1\n        r -= 1\n    return True\n\ndef alphaNum(c):\n    return (ord('A') <= ord(c) <= ord('Z') or\n            ord('a') <= ord(c) <= ord('z') or\n            ord('0') <= ord(c) <= ord('9'))"
    },
    "explanation": "Use two pointers, one at the start and one at the end. Move them towards the center, skipping non-alphanumeric characters, and comparing the lowercase versions of the characters. Time: O(n), Space: O(1)."
  },
  {
    "id": "coding_4",
    "difficulty": "Easy",
    "topic": "Arrays",
    "problem": {
      "title": "Best Time to Buy and Sell Stock",
      "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      "examples": [
        { "input": "prices = [7,1,5,3,6,4]", "output": "5", "note": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }
      ],
      "constraints": [
        "1 <= prices.length <= 10^5",
        "0 <= prices[i] <= 10^4"
      ],
      "solution": "def maxProfit(prices):\n    l, r = 0, 1 # left=buy, right=sell\n    maxP = 0\n    while r < len(prices):\n        if prices[l] < prices[r]:\n            profit = prices[r] - prices[l]\n            maxP = max(maxP, profit)\n        else:\n            l = r\n        r += 1\n    return maxP"
    },
    "explanation": "Use two pointers (or variables for min_price and max_profit). Iterate through prices, updating min_price if current is lower, or calculating profit and updating max_profit if current is higher. Time: O(n), Space: O(1)."
  },
  {
    "id": "coding_5",
    "difficulty": "Easy",
    "topic": "Stack",
    "problem": {
      "title": "Valid Parentheses",
      "description": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
      "examples": [
        { "input": "s = \"()[]{}\"", "output": "true" },
        { "input": "s = \"([)]\"", "output": "false" }
      ],
      "constraints": [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'."
      ],
      "solution": "def isValid(s):\n    stack = []\n    closeToOpen = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for c in s:\n        if c in closeToOpen:\n            if stack and stack[-1] == closeToOpen[c]:\n                stack.pop()\n            else:\n                return False\n        else:\n            stack.append(c)\n    return True if not stack else False"
    },
    "explanation": "Use a stack. Push open brackets onto the stack. When a closing bracket is encountered, check if it matches the open bracket at the top of the stack. If it does, pop it. If not, or if stack is empty, return false. Time: O(n), Space: O(n)."
  },
  {
    "id": "coding_6",
    "difficulty": "Easy",
    "topic": "Linked List",
    "problem": {
      "title": "Reverse Linked List",
      "description": "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
      "examples": [
        { "input": "head = [1,2,3,4,5]", "output": "[5,4,3,2,1]" }
      ],
      "constraints": [
        "The number of nodes in the list is the range [0, 5000].",
        "-5000 <= Node.val <= 5000"
      ],
      "solution": "def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev"
    },
    "explanation": "Iterate through the list, keeping track of the previous node. For each current node, save its next node, point its next to the previous node, then advance previous and current. Time: O(n), Space: O(1)."
  },
  {
    "id": "coding_7",
    "difficulty": "Easy",
    "topic": "Trees",
    "problem": {
      "title": "Invert Binary Tree",
      "description": "Given the `root` of a binary tree, invert the tree, and return its root.",
      "examples": [
        { "input": "root = [4,2,7,1,3,6,9]", "output": "[4,7,2,9,6,3,1]" }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [0, 100].",
        "-100 <= Node.val <= 100"
      ],
      "solution": "def invertTree(root):\n    if not root:\n        return None\n    tmp = root.left\n    root.left = root.right\n    root.right = tmp\n    invertTree(root.left)\n    invertTree(root.right)\n    return root"
    },
    "explanation": "Use recursion (DFS). For each node, swap its left and right children, then recursively call the function on both children. Time: O(n), Space: O(h)."
  },
  {
    "id": "coding_8",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problem": {
      "title": "Climbing Stairs",
      "description": "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      "examples": [
        { "input": "n = 2", "output": "2", "note": "1 step + 1 step, or 2 steps" },
        { "input": "n = 3", "output": "3", "note": "1+1+1, 1+2, 2+1" }
      ],
      "constraints": [
        "1 <= n <= 45"
      ],
      "solution": "def climbStairs(n):\n    one, two = 1, 1\n    for i in range(n - 1):\n        temp = one\n        one = one + two\n        two = temp\n    return one"
    },
    "explanation": "This is essentially the Fibonacci sequence. To reach step n, you can arrive from step n-1 (1 step) or step n-2 (2 steps). Thus, ways(n) = ways(n-1) + ways(n-2). Space can be optimized to O(1) by keeping track of only the last two values. Time: O(n)."
  },
  {
    "id": "coding_9",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problem": {
      "title": "Longest Palindromic Substring",
      "description": "Given a string `s`, return the longest palindromic substring in `s`.",
      "examples": [
        { "input": "s = \"babad\"", "output": "\"bab\"", "note": "\"aba\" is also a valid answer." },
        { "input": "s = \"cbbd\"", "output": "\"bb\"" }
      ],
      "constraints": [
        "1 <= s.length <= 1000",
        "s consist of only digits and English letters."
      ],
      "solution": "def longestPalindrome(s):\n    res = \"\"\n    resLen = 0\n    for i in range(len(s)):\n        # odd length\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > resLen:\n                res = s[l:r+1]\n                resLen = r - l + 1\n            l -= 1\n            r += 1\n        # even length\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > resLen:\n                res = s[l:r+1]\n                resLen = r - l + 1\n            l -= 1\n            r += 1\n    return res"
    },
    "explanation": "Expand around center. For each character (and each pair of characters), treat it as the center of a potential palindrome and expand outwards as long as the characters match. Keep track of the maximum length found. Time: O(n^2), Space: O(1)."
  },
  {
    "id": "coding_10",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "problem": {
      "title": "Group Anagrams",
      "description": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
      "examples": [
        { "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" }
      ],
      "constraints": [
        "1 <= strs.length <= 10^4",
        "0 <= strs[i].length <= 100"
      ],
      "solution": "import collections\n\ndef groupAnagrams(strs):\n    ans = collections.defaultdict(list)\n    for s in strs:\n        count = [0] * 26\n        for c in s:\n            count[ord(c) - ord('a')] += 1\n        ans[tuple(count)].append(s)\n    return ans.values()"
    },
    "explanation": "Use a hash map where the key is the character count (or sorted string) and the value is a list of anagrams. Character counts can be represented as a tuple of 26 integers. Time: O(m*n), where m is number of strings, n is avg length."
  },
  {
    "id": "coding_11",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "problem": {
      "title": "Longest Substring Without Repeating Characters",
      "description": "Given a string `s`, find the length of the longest substring without repeating characters.",
      "examples": [
        { "input": "s = \"abcabcbb\"", "output": "3", "note": "The answer is \"abc\", with the length of 3." }
      ],
      "constraints": [
        "0 <= s.length <= 5 * 10^4"
      ],
      "solution": "def lengthOfLongestSubstring(s):\n    charSet = set()\n    l = 0\n    res = 0\n    for r in range(len(s)):\n        while s[r] in charSet:\n            charSet.remove(s[l])\n            l += 1\n        charSet.add(s[r])\n        res = max(res, r - l + 1)\n    return res"
    },
    "explanation": "Use a sliding window with a set to keep track of characters in the current window. If a duplicate is found, shrink the window from the left until the duplicate is removed. Update max length at each step. Time: O(n), Space: O(min(m, n))."
  },
  {
    "id": "coding_12",
    "difficulty": "Medium",
    "topic": "Linked List",
    "problem": {
      "title": "Linked List Cycle",
      "description": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.",
      "examples": [
        { "input": "head = [3,2,0,-4], pos = 1", "output": "true" }
      ],
      "constraints": [
        "The number of the nodes in the list is in the range [0, 10^4]."
      ],
      "solution": "def hasCycle(head):\n    slow, fast = head, head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False"
    },
    "explanation": "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Maintain two pointers, one moving by 1 step and the other by 2 steps. If there is a cycle, they will eventually meet. Time: O(n), Space: O(1)."
  },
  {
    "id": "coding_13",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problem": {
      "title": "Merge Intervals",
      "description": "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      "examples": [
        { "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]", "output": "[[1,6],[8,10],[15,18]]" }
      ],
      "constraints": [
        "1 <= intervals.length <= 10^4",
        "intervals[i].length == 2"
      ],
      "solution": "def merge(intervals):\n    intervals.sort(key=lambda i: i[0])\n    output = [intervals[0]]\n    for start, end in intervals[1:]:\n        lastEnd = output[-1][1]\n        if start <= lastEnd:\n            output[-1][1] = max(lastEnd, end)\n        else:\n            output.append([start, end])\n    return output"
    },
    "explanation": "First sort the intervals based on their start times. Then, iterate through the intervals, comparing the current interval's start with the previous interval's end to determine if they overlap. If they do, merge them. Time: O(n log n), Space: O(n) for sorting."
  },
  {
    "id": "coding_14",
    "difficulty": "Medium",
    "topic": "Trees",
    "problem": {
      "title": "Validate Binary Search Tree",
      "description": "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).",
      "examples": [
        { "input": "root = [2,1,3]", "output": "true" }
      ],
      "constraints": [
        "The number of nodes in the tree is in the range [1, 10^4]."
      ],
      "solution": "def isValidBST(root):\n    def valid(node, left, right):\n        if not node:\n            return True\n        if not (left < node.val < right):\n            return False\n        return (valid(node.left, left, node.val) and\n                valid(node.right, node.val, right))\n    return valid(root, float(\"-inf\"), float(\"inf\"))"
    },
    "explanation": "Use a helper function that takes the current node and its allowed lower and upper bounds. Recursively check if the left and right subtrees are valid, updating the bounds accordingly. Time: O(n), Space: O(h)."
  },
  {
    "id": "coding_15",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problem": {
      "title": "Number of Islands",
      "description": "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
      "examples": [
        { "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "output": "3" }
      ],
      "constraints": [
        "m == grid.length",
        "n == grid[i].length"
      ],
      "solution": "def numIslands(grid):\n    if not grid: return 0\n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n    \n    def dfs(r, c):\n        if (r not in range(rows) or c not in range(cols) or grid[r][c] == '0'):\n            return\n        grid[r][c] = '0'\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n        \n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                dfs(r, c)\n                islands += 1\n    return islands"
    },
    "explanation": "Iterate through every cell in the grid. If a cell is '1' (land), it's a new island. Increment the counter and run DFS to turn all connected lands ('1's) to water ('0's) to avoid double counting. Time: O(m*n), Space: O(m*n) for recursive stack."
  }
];

fs.writeFileSync(path.join(__dirname, 'src/data/mcq/java.json'), JSON.stringify(javaData, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'src/data/mcq/coding.json'), JSON.stringify(codingData, null, 2), 'utf8');

console.log('Successfully generated java.json and coding.json');
