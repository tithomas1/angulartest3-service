/**
 * Created by tithomas on 8/1/16
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContainerListService {
/*
 * Crude hack to use a proxy server (nginx) fronting the Docker remote API.
 * nginx config will use (and strip) the api145 portion of this to select which
 * Docker engine to forward the request to.
 */

    private targetUrl: string = "http://10.82.6.145/api145";
    private headers: Headers;
    private options: RequestOptions;

    static fakeData = [
            {"Id":"dad3b2b95d047744afe02f04a50f622f75412a49b2be250bb926d01db18a8c47","Names":["/angular2-service"],"Image":"angular2:service","ImageID":"sha256:4d2b9b19a983c606308ad1a6f553b31d8c21e27eb1bb65bc826e02d4d8076a3d","Command":"npm start","Created":1470088644,"Ports":[{"IP":"0.0.0.0","PrivatePort":5858,"PublicPort":5858,"Type":"tcp"},{"IP":"0.0.0.0","PrivatePort":3001,"PublicPort":3001,"Type":"tcp"},{"IP":"0.0.0.0","PrivatePort":3000,"PublicPort":3000,"Type":"tcp"}],"Labels":{},"State":"running","Status":"Up 15 hours","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"","EndpointID":"5105621b0287cfcf7ee6933a20b8913ea7aa403c2d6b34498ae91f557b6e6956","Gateway":"172.17.0.1","IPAddress":"172.17.0.4","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:04"}}},"Mounts":[]},{"Id":"233e6c81c69f3e0d2b4c1aa7ea86b5359ccdbf962fb17e07f7abc0f416621472","Names":["/swarm-mgr"],"Image":"swarm","ImageID":"sha256:a180b24e38eddf9e2133d07e9dc4c2ce7e74cb5adfe5bd34968a2b38f9685856","Command":"/swarm manage consul://10.82.6.149:8500 --strategy spread","Created":1469738388,"Ports":[{"IP":"0.0.0.0","PrivatePort":2375,"PublicPort":5001,"Type":"tcp"}],"Labels":{},"State":"running","Status":"Up 4 days","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"","EndpointID":"73ffc16db83f0befb39091a33aef9d53395863d8c396ea24c62aca3f92ceea4f","Gateway":"172.17.0.1","IPAddress":"172.17.0.3","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:03"}}},"Mounts":[{"Name":"fa378f79cc88c364ed970b6e5964a03c234e2f94d0f080695b903eb3f0e2c655","Source":"/var/lib/docker/volumes/fa378f79cc88c364ed970b6e5964a03c234e2f94d0f080695b903eb3f0e2c655/_data","Destination":"/.swarm","Driver":"local","Mode":"","RW":true,"Propagation":""}]},{"Id":"b32d52f3f8c92c67a21efb89c930fc2002b6d3d4f0db78212f5c67cf7aa1b25b","Names":["/swarm"],"Image":"swarm","ImageID":"sha256:a180b24e38eddf9e2133d07e9dc4c2ce7e74cb5adfe5bd34968a2b38f9685856","Command":"/swarm join --addr=10.82.6.145:2375 consul://10.82.6.149:8500","Created":1469738182,"Ports":[{"PrivatePort":2375,"Type":"tcp"}],"Labels":{},"State":"running","Status":"Up 4 days","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"","EndpointID":"58e3f73fbb15887157e5c707b6d74153407263bfc7b1110a71b28870dead632e","Gateway":"172.17.0.1","IPAddress":"172.17.0.2","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:02"}}},"Mounts":[{"Name":"e4fd77f31574d55ba5f1413bd3339227ac38ff22ea1148527f9ba164e2795835","Source":"/var/lib/docker/volumes/e4fd77f31574d55ba5f1413bd3339227ac38ff22ea1148527f9ba164e2795835/_data","Destination":"/.swarm","Driver":"local","Mode":"","RW":true,"Propagation":""}]}
    ];

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.options = new RequestOptions({headers: this.headers});
    }

    public getContainerList() {
        console.log("ContainerListService.getContainerList() calling " + this.targetUrl);
        return this.http.get(this.targetUrl + '/containers/json', this.options)
            .map((response: Response) => response.json())
            .catch(ContainerListService.handleError);
    }

    /*
    public getContainerList = () => {
        return this.http.get(this.targetUrl + '/containers/json', this.options)
            .map(this.extractData)
            .catch(ContainerListService.handleError);
    }
    */

    public fakeContainerList() {
        return Promise.resolve(ContainerListService.fakeData);
    }

    static handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}