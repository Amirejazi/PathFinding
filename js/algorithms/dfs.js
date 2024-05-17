import { adjacent_nodes_s, adjacent_nodes_d, draw_path } from '../searcher.js'
async function dfs_s(grid) {
    await dfs(grid, adjacent_nodes_s);
}

async function dfs(grid, adjacent_nodes_function) {
    var start_coord = grid.getStart();
    var end_coord = grid.getEnd();
    grid.setCurrentMode(VISITED_TILE);
    
    var visited = [];
    var final_path = [];
    var found = false;
    let nodeCounter = 0;

    async function explore(node, path) {
        visited[node.toString()] = true;
        
        if (node.equals(end_coord)) {
            found = true;
            final_path = path;
            final_path.push(end_coord);
            return;
        }
        if (!node.equals(start_coord)) {
            grid.draw(node);
            nodeCounter +=1;
            await new Promise(r => setTimeout(r, ANIMATION_SPEED));
        }
        path.push(node);
        
        let adjacent = adjacent_nodes_function(grid, node);
        for (var i=0; i<adjacent.length && !found; i++) {
            if (visited[adjacent[i].toString()] === undefined && !found) {
                await explore(adjacent[i], path.slice());
            }
        }
    }
    
    let t1 = performance.now();
    await explore(start_coord, []);
    let t2 = performance.now();

    await draw_path(grid, final_path);
    document.getElementById('time-execute').innerText = `زمان اجرا: ${(t2-t1).toFixed(0)} میلی ثانیه`;
    
    document.getElementById('node-counter').innerText = `نود های بررسی شده: ${nodeCounter}`;
}

export { dfs_s };
