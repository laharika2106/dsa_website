Object.assign(LAB,{
merge:{name:'Merge sort',group:'sorting',time:'O(n log n)',space:'O(n)',idea:'Divide, sort, and reunite.',description:'Split the array into halves, sort each half, then merge two sorted runs. A temporary buffer keeps merging simple and stable.',tryTitle:'Watch the sorted runs grow',tryText:'Try repeated values. Choosing from the left on ties preserves their original relative order.',code:`def merge_sort(a):
    def sort(lo, hi):
        if hi - lo <= 1:
            return
        mid = (lo + hi) // 2
        sort(lo, mid)
        sort(mid, hi)
        left, right = a[lo:mid], a[mid:hi]
        i = j = 0
        for k in range(lo, hi):
            if j == len(right) or (i < len(left) and left[i] <= right[j]):
                a[k] = left[i]
                i += 1
            else:
                a[k] = right[j]
                j += 1
    sort(0, len(a))
    return a`},
quick:{name:'Quicksort',group:'sorting',time:'O(n²)',space:'O(n)',idea:'A pivot puts things in perspective.',description:'Choose the last value as pivot. Partition smaller or equal values to its left, then recursively sort each side. Average time is O(n log n); this pivot choice can give O(n²) time and O(n) recursion depth.',tryTitle:'Try the worst case',tryText:'Use already sorted values. The last-element pivot repeatedly creates an empty partition, revealing why pivot selection matters.',code:`def quicksort(a):
    def sort(lo, hi):
        if lo >= hi:
            return
        pivot, i = a[hi], lo
        for j in range(lo, hi):
            if a[j] <= pivot:
                a[i], a[j] = a[j], a[i]
                i += 1
        a[i], a[hi] = a[hi], a[i]
        sort(lo, i - 1)
        sort(i + 1, hi)
    sort(0, len(a) - 1)
    return a`},
linked:{name:'Traverse a linked list',group:'linkedlists',time:'O(n)',space:'O(1)',idea:'Follow the next pointer.',description:'A singly linked list connects nodes through next pointers. Traversal begins at head and follows each pointer until None. Unlike arrays, reaching an index requires walking through preceding nodes.',tryTitle:'Count the pointer hops',tryText:'Apply 8, 16, 24, 32. Reaching the last node requires following three links from head.',code:`def traverse(head):
    current = head
    while current is not None:
        print(current.value)
        current = current.next`},
reverse:{name:'Reverse a linked list',group:'linkedlists',time:'O(n)',space:'O(1)',idea:'Turn every link around.',description:'Keep previous, current, and next pointers. Save the next node before changing the current link. The visual separates the reversed prefix from the unprocessed suffix.',tryTitle:'Protect the rest of the list',tryText:'Notice why next_node is saved first: changing current.next would otherwise lose the link to the remaining nodes.',code:`def reverse(head):
    previous, current = None, head
    while current is not None:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous`},
heap:{name:'Build a min-heap',group:'heaps',time:'O(n)',space:'O(1)',idea:'The smallest value rises to the root.',description:'A min-heap is a complete binary tree whose parents are no larger than their children. Sift down each internal node, from bottom to top. Building this way takes O(n) time, not O(n log n).',tryTitle:'A heap is not a sorted array',tryText:'The root is the minimum, but siblings need not be ordered. For index i, the children are 2i+1 and 2i+2.',code:`def heapify(a):
    n = len(a)
    for start in range(n // 2 - 1, -1, -1):
        i = start
        while 2 * i + 1 < n:
            child = 2 * i + 1
            if child + 1 < n and a[child + 1] < a[child]:
                child += 1
            if a[i] <= a[child]:
                break
            a[i], a[child] = a[child], a[i]
            i = child
    return a`},
bfs:{name:'Breadth-first search',group:'graphs',time:'O(V + E)',space:'O(V)',idea:'Explore one layer at a time.',description:'BFS uses a queue to visit reachable vertices by distance from the start. Nodes are marked seen when queued, preventing repeated visits even with cycles. Edges here are undirected; disconnected nodes remain unvisited.',tryTitle:'Add a shortcut',tryText:'Add edge 0-5 to the sample graph. Node 5 is now reached in the first layer. Neighbor order follows the edge input.',code:`from collections import deque

def bfs(graph, start):
    seen = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)`},
dfs:{name:'Depth-first search',group:'graphs',time:'O(V + E)',space:'O(V + E)',idea:'Follow a path, then backtrack.',description:'DFS explores as far as it can before returning to another branch. This iterative version uses a stack and marks vertices when popped. Reversed neighbor insertion preserves edge-list neighbor order. Marking on pop can place duplicates on the stack, so this version uses O(V + E) auxiliary space.',tryTitle:'Compare DFS with BFS',tryText:'Keep the same graph and start node, then switch algorithms. Compare the traversal order and the stack versus queue.',code:`def dfs(graph, start):
    seen, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        print(node)
        for neighbor in reversed(graph[node]):
            if neighbor not in seen:
                stack.append(neighbor)`},
fibonacci:{name:'Fibonacci · tabulation',group:'dp',time:'O(n)',space:'O(n)',idea:'Solve once. Reuse the answer.',description:'Store each Fibonacci result in a table. Every new entry reuses the previous two instead of recalculating them recursively. F(0)=0 and F(1)=1. Complexity assumes constant-time arithmetic.',tryTitle:'Find F(10)',tryText:'Enter 10 as the single input. Step through the table to see F(10)=55. The two highlighted cells supply the next result.',code:`def fibonacci(n):
    dp = [0] * (n + 1)
    if n >= 1:
        dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`}
});
let graphEdges=[[0,1],[0,2],[1,3],[1,4],[2,4],[4,5]];
const basicTrace=makeTrace;
makeTrace=function(k,input,target){
 if(!['merge','quick','linked','reverse','heap','bfs','dfs','fibonacci'].includes(k))return basicTrace(k,input,target);
 let a=[...input],out=[];const add=(message,line=0,active=[],done=[],extra={})=>out.push({a:[...a],message,line,active:[...active],done:[...done],...extra});
 add('Ready. Use Play or Next to explore each step.');
 if(k==='merge'){function sort(l,r){if(r-l<=1)return;const m=Math.floor((l+r)/2);add(`Split range [${l}, ${r-1}] at index ${m}.`,5,[l,m,r-1]);sort(l,m);sort(m,r);const left=a.slice(l,m),right=a.slice(m,r);let i=0,j=0;add(`Merge [${left.join(', ')}] and [${right.join(', ')}].`,8);for(let p=l;p<r;p++){if(j===right.length||(i<left.length&&left[i]<=right[j])){a[p]=left[i++];add(`Write ${a[p]} at index ${p} from the left buffer.`,12,[p])}else{a[p]=right[j++];add(`Write ${a[p]} at index ${p} from the right buffer.`,15,[p])}}}sort(0,a.length);add('Sorted! All runs are merged.',18,[],a.map((_,i)=>i))}
 if(k==='quick'){const fixed=[];function sort(l,r){if(l>=r){if(l===r)fixed.push(l);return}const pivot=a[r];let i=l;add(`Pivot ${pivot} at index ${r}. Partition [${l}, ${r}].`,5,[r],fixed);for(let j=l;j<r;j++){add(`Compare ${a[j]} with pivot ${pivot}.`,7,[j,r],fixed);if(a[j]<=pivot){[a[i],a[j]]=[a[j],a[i]];add(`Move ${a[i]} into the left partition.`,8,[i,j,r],fixed);i++}}[a[i],a[r]]=[a[r],a[i]];fixed.push(i);add(`Pivot ${pivot} settles at index ${i}.`,10,[],fixed);sort(l,i-1);sort(i+1,r)}sort(0,a.length-1);add('Sorted! All partitions are complete.',14,[],a.map((_,i)=>i))}
 if(k==='linked'){const seen=[];for(let i=0;i<a.length;i++){add(`Visit node ${i}, value ${a[i]}.`,4,[i],seen);seen.push(i);add(i===a.length-1?'Next is None. Traversal ends.':`Follow next to node ${i+1}.`,5,[],seen)}}
 if(k==='reverse'){for(let i=0;i<a.length;i++){add(`Save next before changing node ${i}'s link.`,4,[i],[],{split:i});add(`Point ${a[i]} back to ${i?a[i-1]:'None'}. Advance current.`,5,[i],[],{split:i+1})}add('All links reversed. Previous becomes the new head.',8,[],a.map((_,i)=>i),{split:a.length})}
 if(k==='heap'){for(let start=Math.floor(a.length/2)-1;start>=0;start--){let i=start;add(`Sift down the subtree at index ${start}.`,4,[i]);while(2*i+1<a.length){let c=2*i+1;if(c+1<a.length&&a[c+1]<a[c])c++;add(`Compare parent ${a[i]} with smaller child ${a[c]}.`,9,[i,c]);if(a[i]<=a[c])break;[a[i],a[c]]=[a[c],a[i]];add('Swap parent and child to restore heap order.',11,[i,c]);i=c}}add('Min-heap ready. Every parent is no larger than its children.',13,[],a.map((_,i)=>i))}
 if(k==='bfs'||k==='dfs'){const adj=new Map(a.map(v=>[v,[]]));for(const [x,y] of graphEdges)if(adj.has(x)&&adj.has(y)){if(!adj.get(x).includes(y))adj.get(x).push(y);if(!adj.get(y).includes(x))adj.get(y).push(x)}const start=a.includes(target)?target:a[0],front=[start],seen=new Set(k==='bfs'?[start]:[]),visited=[];add(`Start at ${start}. ${k==='bfs'?'Queue':'Stack'}: [${front}].`,k==='bfs'?5:2,[],[],{front:[...front]});while(front.length){const v=k==='bfs'?front.shift():front.pop();if(k==='dfs'&&seen.has(v))continue;seen.add(v);visited.push(v);add(`Visit ${v}. Order: ${visited.join(' → ')}.`,8,[a.indexOf(v)],visited.map(x=>a.indexOf(x)),{front:[...front]});const neighbors=k==='bfs'?adj.get(v):[...adj.get(v)].reverse();for(const nb of neighbors)if(!seen.has(nb)){if(k==='bfs')seen.add(nb);front.push(nb);add(`Add ${nb} to the ${k==='bfs'?'queue':'stack'}.`,k==='bfs'?12:11,[a.indexOf(v)],visited.map(x=>a.indexOf(x)),{front:[...front]})}}add(`Traversal complete: ${visited.join(' → ')}. ${a.length-visited.length} unreachable node(s).`,0,[],visited.map(x=>a.indexOf(x)),{front:[]})}
 if(k==='fibonacci'){const n=a[0];a=Array(n+1).fill(0);out=[];add(`Initialize a table for F(0) through F(${n}).`,2);if(n>=1){a[1]=1;add('Base cases: F(0)=0 and F(1)=1.',4,[0,1],[0,1])}for(let i=2;i<=n;i++){add(`Read F(${i-2})=${a[i-2]} and F(${i-1})=${a[i-1]}.`,5,[i-2,i-1],Array.from({length:i},(_,j)=>j));a[i]=a[i-1]+a[i-2];add(`F(${i}) = ${a[i-2]} + ${a[i-1]} = ${a[i]}.`,6,[i],Array.from({length:i+1},(_,j)=>j))}add(`F(${n}) = ${a[n]}. Each subproblem was computed once.`,7,[],a.map((_,i)=>i))}
 return out;
};
function validateAdvanced(k,a,target,edges=graphEdges){if(k==='fibonacci'&&(a.length!==1||a[0]<0||a[0]>20))throw Error('For Fibonacci, enter one integer n between 0 and 20.');if(k==='bfs'||k==='dfs'){if(a.some(v=>v<0)||new Set(a).size!==a.length)throw Error('Graph node IDs must be distinct nonnegative integers.');if(!a.includes(target))throw Error('Start node must appear in your node IDs.');if(edges.some(([x,y])=>!a.includes(x)||!a.includes(y)))throw Error('Every edge endpoint must appear in your node IDs.')}}
function renderAdvanced(s){
 if(category==='linkedlists'){const node=i=>`<div class="link-node ${s.active.includes(i)?'is-active':''} ${s.done.includes(i)?'is-done':''}"><b>${s.a[i]}</b><small>node ${i}</small></div>`;const chain=indices=>indices.map(node).join('<span class="link-arrow">→</span>')+'<span class="null-node">→ None</span>';if(key==='reverse'){$('viz').innerHTML=`<div class="chains"><div><span class="chain-label">previous · reversed</span><div class="chain">${chain(Array.from({length:s.split||0},(_,i)=>(s.split||0)-1-i))}</div></div><div><span class="chain-label">current · remaining</span><div class="chain">${chain(s.a.map((_,i)=>i).slice(s.split||0))}</div></div></div>`}else $('viz').innerHTML=`<div class="chains"><span class="chain-label">head</span><div class="chain">${chain(s.a.map((_,i)=>i))}</div></div>`;return true}
 if(category==='dp'){$('viz').innerHTML=`<div class="dp-grid">${s.a.map((v,i)=>`<div class="dp-cell ${s.active.includes(i)?'is-active':s.done.includes(i)?'is-done':''}"><small>F(${i})</small><b>${v}</b></div>`).join('')}</div>`;return true}
 if(category==='graphs'||category==='heaps'){const n=s.a.length,coords=s.a.map((v,i)=>{if(category==='graphs'){const t=2*Math.PI*i/n-Math.PI/2;return{x:260+175*Math.cos(t),y:115+85*Math.sin(t)}}const depth=Math.floor(Math.log2(i+1)),offset=i-(2**depth-1);return{x:(offset+.5)*520/2**depth,y:25+depth*60}});let edges=category==='graphs'?graphEdges.map(([x,y])=>[s.a.indexOf(x),s.a.indexOf(y)]):s.a.slice(1).map((_,j)=>[Math.floor(j/2),j+1]);const lines=edges.filter(([x,y])=>x>=0&&y>=0).map(([x,y])=>`<line x1="${coords[x].x}" y1="${coords[x].y}" x2="${coords[y].x}" y2="${coords[y].y}" stroke="var(--bar)" stroke-width="2"/>`).join('');$('viz').innerHTML=`<div class="network"><svg viewBox="0 0 520 235" role="img" aria-label="${category==='graphs'?'Undirected graph':'Min-heap'}">${lines}${s.a.map((v,i)=>`<circle cx="${coords[i].x}" cy="${coords[i].y}" r="19" fill="${s.active.includes(i)?'var(--active)':s.done.includes(i)?'var(--lime)':'var(--surface)'}" stroke="var(--bar)"/><text x="${coords[i].x}" y="${coords[i].y+5}" text-anchor="middle" class="node-label" style="${s.done.includes(i)&&!s.active.includes(i)?'fill:var(--bg)':''}">${v}</text>`).join('')}</svg><div class="frontier">${category==='graphs'?`${key==='bfs'?'Queue (front → rear)':'Stack (bottom → top)'}: [${(s.front||[]).join(', ')}]`:`Array: [${s.a.join(', ')}]`}</div></div>`;return true}return false;
}
