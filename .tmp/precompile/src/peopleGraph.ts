module powerbi.extensibility.visual.peopleGraph99E9F31DDFD7429BACA50118466E4D11  {
    export class peopleGraph implements IVisual {
        private updateCount: number;
        private settings: VisualSettings;

        private targetElement: HTMLElement;

        private host: IVisualHost;

        private color: any;

        private links: PeopleGraphLink[] = [];
        private nodes: PeopleGraphNode[] = [];

        private defs: any;
        private link: any;
        private node: any;
        private photo: any;
        private clipPathPhoto: any;
        private forceSimulation;

        private PeopleGraphData = {};

        private linkSelection;
        private nodeSelection;

        private svg;



        private static DefaultImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAHNDTTxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACuUExURQAAAMbGxvLy8sfHx/Hx8fLy8vHx8cnJycrKyvHx8fHx8cvLy/Ly8szMzM3NzfHx8dDQ0PHx8fLy8vHx8e/v79LS0tPT0/Ly8tTU1NXV1dbW1vHx8fHx8fDw8NjY2PT09PLy8vLy8vHx8fLy8vHx8fHx8enp6fDw8PLy8uPj4+Tk5OXl5fHx8b+/v/Pz8+bm5vHx8ejo6PLy8vHx8fLy8sTExPLy8vLy8sXFxfHx8YCtMbUAAAA6dFJOUwD/k/+b7/f///+r/////0z/w1RcEP//ZP///4fj/v8Yj3yXn/unDEhQ////YP9Y/8//aIMU/9+L/+fzC4s1AAAACXBIWXMAABcRAAAXEQHKJvM/AAABQElEQVQoU5WS61LCMBCFFymlwSPKVdACIgWkuNyL+P4v5ibZ0jKjP/xm0uw5ySa7mRItAhnMoIC5TwQZdCZiZjcoC8WU6EVsmZgzoqGdxafgvJAvjUXCb2M+0cXNsd/GDarZqSf7av3M2P1E3xhfLkPUvLD5joEYwVVJQXM6+9McWUwLf4nDTCQZAy96UoDjNI/jhl3xPLbQamu8xD7iaIsPKw7GJ7KZEnWLY3Gi8EFj5nqibXnwD5VEGjJXk5sbpLppfvvo1RazQVrhSopPK4TODrtnjS3dY4ic8KurruWQYF+UG60BacexTMyT2jlNg41dOmKvTpkUd/Jevy7ZxQ61ULRUpoododx8GeDPvIrktbFVdUsK6f8Na5VlVpjZJtowTXVy7kfXF5wCaV1tqXAFuIdWJu+JviaQzNzfQvQDGKRXXEmy83cAAAAASUVORK5CYII=';

        // Creates instance of Visual. This method is only called once.
        // options - Contains references to the element that will contain the visual and a reference to the host which contains services.

        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.host = options.host;
            this.targetElement = options.element;

            //00 Create D3 container object 
            this.svg = d3.select(this.targetElement).append('svg');
            this.defs = this.svg.append('svg:defs');

            this.color = d3.scaleOrdinal(d3.schemeCategory10);

        }

        // Updates the state of the visual. Every sequential databinding and resize will call update.
        // options - Contains references to the size of the container and the dataView which contains all the data the visual had queried.

        public update(options: VisualUpdateOptions) {
            console.log('Visual update', options);

            //01: Get Data from options

            //02: Transform data to objects
            this.ConvertDataView2ModelData();
            console.log(options.dataViews[0]);

            //03: Create DOM Elements using D3
            this.RenderPeopleGraph(options.viewport.width, options.viewport.height);
        }

        private ConvertDataView2ModelData = () => {

            this.nodes = [{
                name: 'Arthur',
                photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAyVAAAAJDY2ODQ1NDBlLTEyN2ItNDQ0Mi1iY2I0LTM4MmEwZWQ5ZDU3NQ.jpg',
                size: 2
            }, {
                name: 'Mike',
                photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAiYAAAAJDAxNmZmZDMyLTAxNTItNGU2MC1hZWExLWI0MmRlNzJkMzVkOQ.jpg',
                size:1
            }, {
                name: 'Alberto',
                photo: 'https://pbs.twimg.com/profile_images/1427128054/Solo-Volto-1-600x600_400x400.jpg',
                size:5
            }, {
                name: 'Erik',
                photo: 'https://media.licdn.com/mpr/mpr/shrink_100_100/p/1/000/0f8/22c/3f4297b.jpg',
                size:1
            }, {
                name: 'Kate',
                photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAANGAAAAJGExYmFhMDg5LWVhNzUtNGZjZC1hMjVjLWI0M2U1ZjNiMDdkYg.jpg',
                size:3
            }, {
                name: 'Satea',
                photo: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAJaAAAAJGRjMmNlNmM0LTIzMzItNDRlZS1hMGQ4LWEwMmMwN2M5NzllMg.jpg',
                size:10
            }
            ];

            var links = [

                {
                    source: this.nodes[2],
                    target: this.nodes[5]
                }, {
                    source: this.nodes[0],
                    target: this.nodes[3]
                }, {
                    source: this.nodes[0],
                    target: this.nodes[4]
                }, {
                    source: this.nodes[0],
                    target: this.nodes[2]
                }, {
                    source: this.nodes[0],
                    target: this.nodes[1]
                }
            ];



        }

        private RenderPeopleGraph = (width, height) => {
            //Update size svg
            this.svg.attr('width', width).attr('height', height);


            this.link = this.svg.selectAll('.link')
                .data(this.links)
                .enter().append('line')
                .attr('class', 'link');


            this.node = this.svg.selectAll('.node')
                .data(this.nodes).enter()
                .append('circle')
                .attr('class', 'node')
                .attr("stroke", function (d) {
                    return d.color;
                })
                .attr("r", function (d) {
                    return d.r + 5;
                })
                .call(d3.drag()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended));

            this.photo = this.svg.selectAll('.photo')
                .data(this.nodes).enter()
                .append('image')
                .attr('class', 'photo')
                .attr('xlink:href', function (d) {
                    return d.photo
                })
                .attr('width', function (d) {
                    return d.r * 2
                })
                .attr('height', function (d) {
                    return d.r * 2
                })
                // .attr('transform', function(d) { return 'translate(' + parseInt(d.x+20)+','+parseInt(d.y+20)+')'} )
                .attr('clip-path', function (d, i) {
                    return 'url(#clipPathPhoto' + i + ')'
                })
                .call(d3.drag()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended));
            this.clipPathPhoto = this.defs.selectAll('.clipPathPhoto')
                .data(this.nodes).enter()
                .append('clipPath')
                .attr('id', function (d, i) {
                    return 'clipPathPhoto' + i
                })
                .attr('class', 'clipPathPhoto')
                .append('circle')
                .attr('class', 'clipPathPhotoCircle')
                .attr('r', function (d) {
                    return d.r
                });


            this.forceSimulation = d3.forceSimulation();

            //Add nodes
            this.forceSimulation.nodes(this.nodes);

            //Add Links
            this.forceSimulation.force("link_nodes_together", d3.forceLink()
                .links(this.links)
                .id(function (d: any) {
                    return d.index
                })
                .distance(100)
                .strength(1)
            );
            //Add additional force functions
            this.forceSimulation
                .force("center_nodes", d3.forceCenter(width / 2, height / 2))
                .force('push_them_apart', d3.forceManyBody()
                    .strength(-500))
                .force('collision_detect', d3.forceCollide()
                    .radius(25))

                ;

            this.forceSimulation.on("tick", this.ticked);
        }

        ticked = () => {
            this.link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            this.svg.selectAll('.node').data(this.nodes)
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });

            this.svg.selectAll('.photo').data(this.nodes)
                .attr("x", function (d) {
                    return d.x - d.r;
                })
                .attr("y", function (d) {
                    return d.y - d.r;
                });

            this.svg.selectAll('.clipPathPhotoCircle').data(this.nodes)
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }



        dragstarted = (d) => {
            if (!d3.event.active) this.forceSimulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        dragended = (d) => {
            if (!d3.event.active) this.forceSimulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         * Below is a code snippet for a case where you want to expose a single property called "lineColor" from the object called "settings"
         * This object and property should be first defined in the capabilities.json file in the objects section.
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}