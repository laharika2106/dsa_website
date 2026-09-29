const LAB = {
bubble:{name:'Bubble sort',group:'sorting',time:'O(n²)',space:'O(1)',idea:'Small steps, sorted results.',description:'Compare neighboring values and swap them when they are out of order. Each pass moves the largest remaining value to its final position.',tryTitle:'An already sorted array',tryText:'Apply 10, 20, 30, 40. The early-exit check finishes after one pass without any swaps.',code:`def bubble_sort(a):
    for end in range(len(a) - 1, 0, -1):
        swapped = False
        for j in range(end):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`},
selection:{name:'Selection sort',group:'sorting',time:'O(n²)',space:'O(1)',idea:'Find the smallest. Place it next.',description:'Scan the unsorted region for its minimum, then move that value to the front. The sorted region grows by one value per pass.',tryTitle:'Watch the minimum change',tryText:'Try 60, 50, 40, 30, 20, 10. Follow the active values as each new minimum is discovered.',code:`def selection_sort(a):
    for i in range(len(a)):
        smallest = i
        for j in range(i + 1, len(a)):
            if a[j] < a[smallest]:
                smallest = j
        a[i], a[smallest] = a[smallest], a[i]
    return a`},
insertion:{name:'Insertion sort',group:'sorting',time:'O(n²)',space:'O(1)',idea:'Like sorting cards in your hand.',description:'Take the next value and shift larger values to the right until there is room to insert it. The prefix stays sorted throughout.',tryTitle:'Almost sorted?',tryText:'Try 10, 20, 40, 30, 50. Only one value needs shifting. Insertion sort is efficient on nearly sorted input.',code:`def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`},
linear:{name:'Linear search',group:'searching',time:'O(n)',space:'O(1)',idea:'One value at a time.',description:'Check each value from left to right. Return the first matching index, or −1 if no value matches. The input does not need to be sorted.',tryTitle:'Search for something missing',tryText:'Choose a target absent from your array. The search must check every value before it can report not found.',code:`def linear_search(a, target):
    for i, value in enumerate(a):
        if value == target:
            return i
    return -1`},
binary:{name:'Binary search',group:'searching',time:'O(log n)',space:'O(1)',idea:'Halve the search space.',description:'Compare the middle value with the target and discard the impossible half. This lab sorts your input first; the reported index refers to that sorted array.',tryTitle:'Follow the shrinking range',tryText:'Search for the smallest value, then the largest. Watch how the left and right boundaries move. Sorting preparation is excluded from search complexity.',code:`def binary_search(a, target):
    left, right = 0, len(a) - 1
    while left <= right:
        mid = (left + right) // 2
        if a[mid] == target:
            return mid
        if a[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`},
stack:{name:'Stack · LIFO',group:'stacks',time:'O(1)*',space:'O(n)',idea:'Last in, first out.',description:'Push adds a value to the top. Pop removes the most recently added value. Python list append has amortized O(1) cost; pop from the end is O(1).',tryTitle:'Undo, explained',tryText:'Push three values, then pop twice. They come out in reverse order—the same principle behind an undo history.',code:`stack = []

def push(value):
    stack.append(value)

def pop():
    if not stack:
        return None
    return stack.pop()

def peek():
    return stack[-1] if stack else None`},
queue:{name:'Queue · FIFO',group:'queues',time:'O(1)',space:'O(n)',idea:'First in, first out.',description:'Enqueue adds to the rear. Dequeue removes from the front. Python collections.deque supports these operations in O(1) time.',tryTitle:'A fair waiting line',tryText:'Enqueue a few values, then dequeue. The oldest value leaves first, just like tasks waiting for a printer.',code:`from collections import deque
queue = deque()

def enqueue(value):
    queue.append(value)

def dequeue():
    if not queue:
        return None
    return queue.popleft()

def peek():
    return queue[0] if queue else None`},
bst:{name:'Binary search tree',group:'trees',time:'O(h)',space:'O(n)',idea:'Smaller left. Larger right.',description:'Each node stores a value. Smaller values go left and larger values go right. Search and insertion cost O(h), where h is tree height: O(log n) when balanced, O(n) when skewed. Duplicate values are ignored.',tryTitle:'Discover inorder traversal',tryText:'Press Inorder to visit left subtree, node, then right subtree. A binary search tree produces values in ascending order.',code:`class Node:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    return node

def inorder(node):
    if node:
        yield from inorder(node.left)
        yield node.value
        yield from inorder(node.right)`}
};
function makeTrace(key,input,target){
 const a=[...input],steps=[];const add=(message,line,active=[],done=[])=>steps.push({a:[...a],message,line,active:[...active],done:[...done]});
 if(key==='binary')a.sort((x,y)=>x-y);
 add(key==='binary'?'Input sorted ascending. Ready to search.':'Ready. Press Play or take one step at a time.',0);
 let n=a.length;
 if(key==='bubble'){let done=[];for(let end=n-1;end>0;end--){let swapped=false;for(let j=0;j<end;j++){add(`Compare ${a[j]} and ${a[j+1]}.`,5,[j,j+1],done);if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];swapped=true;add('Swap: the smaller value moves left.',6,[j,j+1],done)}}done.push(end);add(`${a[end]} is in its final position.`,8,[],done);if(!swapped)break}add('Sorted! Every value is in ascending order.',10,[],a.map((_,i)=>i))}
 if(key==='selection'){for(let i=0;i<n;i++){let m=i;const d=Array.from({length:i},(_,j)=>j);add(`Find the smallest value from index ${i}.`,3,[i],d);for(let j=i+1;j<n;j++){add(`Compare ${a[j]} with the current minimum ${a[m]}.`,5,[j,m],d);if(a[j]<a[m]){m=j;add(`New minimum: ${a[m]}.`,6,[m],d)}}[a[i],a[m]]=[a[m],a[i]];add(`Place ${a[i]} at index ${i}.`,7,[i],[...d,i])}add('Sorted! Every value is in ascending order.',8,[],a.map((_,i)=>i))}
 if(key==='insertion'){for(let i=1;i<n;i++){let v=a[i],j=i-1;add(`Hold ${v} as the key.`,3,[i]);while(j>=0&&a[j]>v){add(`Compare ${a[j]} with held key ${v}.`,5,[j]);a[j+1]=a[j];add(`Shift ${a[j]} right; key ${v} is held separately.`,6,[j,j+1]);j--}a[j+1]=v;add(`Insert key ${v} at index ${j+1}.`,8,[j+1],Array.from({length:i+1},(_,k)=>k))}add('Sorted! Every value is in ascending order.',9,[],a.map((_,i)=>i))}
 if(key==='linear'){let found=false;for(let i=0;i<n;i++){add(`Check index ${i}: is ${a[i]} equal to ${target}?`,3,[i]);if(a[i]===target){add(`Found ${target} at index ${i}. Return ${i}.`,4,[],[i]);found=true;break}}if(!found)add(`${target} is not in the array. Return −1.`,5)}
 if(key==='binary'){let l=0,r=n-1,found=false;while(l<=r){let m=Math.floor((l+r)/2);add(`Range [${l}, ${r}]. Middle index ${m} holds ${a[m]}.`,4,[m]);if(a[m]===target){add(`Found ${target} at sorted index ${m}.`,6,[],[m]);found=true;break}if(a[m]<target){l=m+1;add(`${a[m]} < ${target}. Search right: left = ${l}.`,8,[m])}else{r=m-1;add(`${a[m]} > ${target}. Search left: right = ${r}.`,10,[m])}}if(!found)add(`${target} is not in the array. Return −1.`,11)}
 return steps;
}
function buildTree(values){let root=null;for(const v of values){if(!root){root={v,left:null,right:null};continue}let p=root;while(p.v!==v){let k=v<p.v?'left':'right';if(!p[k]){p[k]={v,left:null,right:null};break}p=p[k]}}return root}
if(typeof module!=='undefined')module.exports={LAB,makeTrace,buildTree};
