import{HF as ht,Aw as dt,sp as ye,eF as be,bo as we,br as Ce,EE as je,p$ as ce,y1 as pt,DP as We,Lv as ft,yN as R,B0 as mt,C4 as Ze,j7 as gt,o3 as _t,KT as vt,MB as xt,oI as Ye,jP as yt,LZ as _e,MC as bt,Bp as wt,o as Ct,qA as Tt,tk as ne,Jq as Pt,DZ as St,H5 as Dt,tG as At,IE as _,mh as Te,pO as Ie,kI as Xe,jw as m,un as N,z3 as Ke,GG as Pe,q0 as fe,E_ as Ee,pJ as zt,pP as Oe,A_ as Je,IK as Re,p_ as Ft,Li as $t,Fb as Mt,D5 as Gt,rd as It,ul as Et,H1 as Ot,Aa as Qe,BI as et,Fc as Rt,pH as ae,rR as Se,IF as De,jz as Ae,LP as ze,bd as ve,aG as B,oa as tt,Ku as it,lH as ee,I as kt,ut as Ht,kH as qt,rU as ke,wf as U,Ag as He,AL as qe,jd as Bt,ev as Vt,jB as W,ws as Lt,zB as Nt,Lr as Ut,wS as jt,N9 as Be,E5 as Wt,bp as Zt,f9 as Ve,zC as Yt,Gi as Xt,wc as Kt,vV as Jt,f6 as Qt,hg as ei,m as ti,uF as ii,Eg as Le,xy as ai,Fd as si,eI as ni,zw as ri,yO as oi}from"./index-A2LG-l3h.js";import{E as li}from"./tiles3DUtils-uc2un4Gc.js";import{a as ui}from"./LayerView3D-RwyE068e.js";import{E as ci}from"./LayerElevationProvider-BEOwHnM-.js";import{I as hi}from"./LayerView-81exH6ox.js";import"./projectBoundingSphere-40QJr_zz.js";let di=class extends ht{constructor(e,t,a,n){super(e,0,0,0,t),this.cachedNodes=a,this.memoryMBCached=n}};const P=4096,Fe=64,Z=1023,X=Z+1,at=P*Fe/X,re=4,st=X*re,Ne=Z*re,pi=P*Fe;let fi=class{constructor(e=at){this._pageCount=e;const t=Math.ceil(e/32);this._bitset=new Uint32Array(t)}get pageCount(){return this._pageCount}isAllocated(e){const t=e/32|0,a=e%32;return!!(this._bitset[t]&1<<a)}allocate(e){const t=e/32|0,a=e%32;this._bitset[t]|=1<<a}free(e){const t=e/32|0,a=e%32;this._bitset[t]&=~(1<<a)}findFirstFreePage(){for(let e=0;e<this._bitset.length;e++)if(this._bitset[e]!==4294967295)for(let t=0;t<32;t++){const a=32*e+t;if(a>=this._pageCount)break;if(!(this._bitset[e]&1<<t))return a}return null}resize(e){this._pageCount=e;const t=Math.ceil(e/32),a=this._bitset.length;if(t!==a){const n=new Uint32Array(t),s=Math.min(a,t);n.set(this._bitset.subarray(0,s)),this._bitset=n}this._clearExcessBits(this._bitset,e)}_clearExcessBits(e,t){const a=Math.floor((t-1)/32),n=(t-1)%32;if(t>0&&n<31){const s=(1<<n+1)-1;e[a]&=s}a+1<e.length&&e.fill(0,a+1)}};class mi extends dt{constructor(e){super("GaussianSplatSortWorker","sort",{sort:t=>[t.distances.buffer,t.sortOrderIndices.buffer]},e,{strategy:"dedicated"})}sort(e,t){return this.invokeMethod("sort",e,t)}async destroyWorkerAndSelf(){await this.broadcast({},"destroy"),this.destroy()}}let gi=class{constructor(e){this.texture=null,this._fadeTextureCapacity=0,this._rctx=e}ensureCapacity(e){if(this._fadeTextureCapacity>e)return;const t=Math.max(Math.ceil(e*ce),at),[a,n]=this._evalTextureSize(t),s=a*n,r=this._fadeBuffer,c=new Uint8Array(s);r&&c.set(r.subarray(0,this._fadeTextureCapacity)),this._fadeBuffer=c,this._fadeTextureCapacity=s,this.texture?.dispose();const o=new ye;o.width=a,o.height=n,o.pixelFormat=36244,o.dataType=be.UNSIGNED_BYTE,o.internalFormat=we.R8UI,o.unpackAlignment=1,o.wrapMode=33071,o.samplingMode=9728,o.isImmutable=!0,this.texture=new Ce(this._rctx,o)}updateTexture(e){this.ensureCapacity(e);const t=this.texture.descriptor.width,a=Math.ceil(e/t),n=t*a;this.texture.updateData(0,0,0,t,a,this._fadeBuffer.subarray(0,n))}updateBuffer(e,t){this.ensureCapacity(t+1),this._fadeBuffer&&(this._fadeBuffer[t]=e)}destroy(){this.texture?.dispose()}_evalTextureSize(e){const t=Math.ceil(Math.sqrt(e)),a=Math.ceil(e/t);return je(t,a)}};class _i{constructor(e){this.texture=null,this._orderTextureCapacity=0,this._rctx=e}ensureCapacity(e){if(this._orderTextureCapacity>=e)return;const t=Math.max(Math.ceil(e*ce),pi),[a,n]=this._evalTextureSize(t),s=a*n;this._orderBuffer=new Uint32Array(s),this._orderTextureCapacity=s,this.texture?.dispose();const r=new ye;r.width=a,r.height=n,r.pixelFormat=36244,r.dataType=be.UNSIGNED_INT,r.internalFormat=we.R32UI,r.wrapMode=33071,r.samplingMode=9728,r.isImmutable=!0,this.texture=new Ce(this._rctx,r),this._orderTextureCapacity=s}setData(e,t){this.ensureCapacity(t),this._orderBuffer.set(e);const a=this.texture.descriptor.width,n=Math.ceil(t/a),s=a*n;this.texture.updateData(0,0,0,a,n,this._orderBuffer.subarray(0,s))}clear(){this._orderTextureCapacity=0,this.texture?.dispose(),this.texture=null}destroy(){this.texture?.dispose()}_evalTextureSize(e){const t=Math.ceil(Math.sqrt(e)),a=Math.ceil(e/t);return je(t,a)}}let vi=class{constructor(e,t,a){this._splatAtlasTextureHeight=Fe,this.texture=null,this._rctx=e,this._fboCache=a,this.pageAllocator=new fi,this._cache=t.newCache("gaussian texture cache",n=>n.dispose())}ensureTextureAtlas(){if(this.texture)return;const e=this._cache.pop("splatTextureAtlas");if(e)return void(this.texture=e);const t=new ye;t.height=this._splatAtlasTextureHeight,t.width=P,t.pixelFormat=36249,t.dataType=be.UNSIGNED_INT,t.internalFormat=we.RGBA32UI,t.samplingMode=9728,t.wrapMode=33071,t.isImmutable=!0,this.texture=new Ce(this._rctx,t),this._updatePageAllocator()}grow(){if(!this.texture)return this.ensureTextureAtlas(),!1;const e=Math.floor(this._splatAtlasTextureHeight*ce);if(e*P>this._rctx.parameters.maxPreferredTexturePixels)return!1;const t=new pt(this._rctx,this.texture),a=this._fboCache.acquire(P,e,"gaussian splat atlas resize",12);return this._rctx.blitFramebuffer(t,a.fbo,16384,9728,0,0,P,this._splatAtlasTextureHeight,0,0,P,this._splatAtlasTextureHeight),this.texture?.dispose(),this.texture=a.fbo?.detachColorTexture(),t.dispose(),a.dispose(),this._splatAtlasTextureHeight=e,this._updatePageAllocator(),!0}requestPage(){let e=this.pageAllocator.findFirstFreePage();return e===null&&this.grow()&&(e=this.pageAllocator.findFirstFreePage()),e!==null&&this.pageAllocator.allocate(e),e}freePage(e){this.pageAllocator.free(e)}update(e,t,a){this.ensureTextureAtlas(),this.texture.updateData(0,e,t,X,1,a)}_updatePageAllocator(){const e=P*this._splatAtlasTextureHeight/X;this.pageAllocator.pageCount!==e&&this.pageAllocator.resize(e)}clear(){this.texture&&(this._cache.put("splatTextureAtlas",this.texture),this.texture=null)}destroy(){this._cache.destroy(),this.texture?.dispose()}};class xi{constructor(e){this._updating=We(!1),this._useDeterministicSort=!1,this.visibleGaussians=0,this._visibleGaussianTiles=new Array,this._workerHandle=null,this._isSorting=!1,this._pendingSortTask=!1,this._bufferCapacity=0,this._minimumBoundingSphere=new ft,this._cameraDirectionNormalized=R(),this._frameTask=null,this._renderer=e,this._orderTexture=new _i(this._renderer.renderingContext),this._fadingTexture=new gi(this._renderer.renderingContext),this._textureAtlas=new vi(this._renderer.renderingContext,this._renderer.view.resourceController.memoryController,this._renderer.fboCache);const{resourceController:t}=this._renderer.view;this._workerHandle=new mi(mt(t)),this._frameTask=t.scheduler.registerTask(Ze.GAUSSIAN_SPLAT_SORTING)}get textureAtlas(){return this._textureAtlas}get orderTexture(){return this._orderTexture}get fadingTexture(){return this._fadingTexture}get visibleGaussianTiles(){return this._visibleGaussianTiles}forEachTile(e){for(const t of this._visibleGaussianTiles)e(t)}updateGaussianVisibility(e){this._visibleGaussianTiles=e,this.requestSort()}get updating(){return this._updating.value}destroy(){this._pendingSortTask=!1,this._frameTask.remove(),this._workerHandle?.destroyWorkerAndSelf(),this._textureAtlas.destroy(),this._orderTexture.destroy(),this._fadingTexture.destroy()}requestSort(){this._updating.value=!0,this._isSorting?this._pendingSortTask=!0:(this._isSorting=!0,this._pendingSortTask=!1,this._sortOnWorker().then(()=>this._handleSortComplete()).catch(()=>this._handleSortComplete()))}_handleSortComplete(){this._isSorting=!1,this._pendingSortTask?this.requestSort():this._updating.value=!1}_clearBuffersAndTextures(){this._bufferCapacity=0,this._orderTexture.clear(),this._textureAtlas.clear()}_ensureBufferCapacity(e){if(this._bufferCapacity<e){const t=Math.ceil(e*ce);this._atlasIndicesBuffer=new Uint32Array(t),this._sortedAtlasIndicesBuffer=new Uint32Array(t),this._distancesBuffer=new Float64Array(t),this._sortOrderBuffer=new Uint32Array(t),this._bufferCapacity=t}}async _sortOnWorker(){if(this._visibleGaussianTiles.length===0)return this.visibleGaussians=0,this._clearBuffersAndTextures(),void this._renderer.requestRender(1);this._useDeterministicSort&&this._visibleGaussianTiles.sort((l,u)=>l.obb.centerX-u.obb.centerX||l.obb.centerY-u.obb.centerY||l.obb.centerZ-u.obb.centerZ);let e=this._visibleGaussianTiles.reduce((l,u)=>l+u.gaussianAtlasIndices.length,0);this._ensureBufferCapacity(e),this._textureAtlas.ensureTextureAtlas();const{frustum:t}=this._renderer.camera;gt(this._cameraDirectionNormalized,this._renderer.camera.ray.direction);const a=this._cameraDirectionNormalized[0],n=this._cameraDirectionNormalized[1],s=this._cameraDirectionNormalized[2];let r=0;const c=1.5;if(this.forEachTile(l=>{const{gaussianAtlasIndices:u,positions:d}=l;if(this._minimumBoundingSphere.center=l.obb.center,this._minimumBoundingSphere.radius=(l.obb.radius+l.maxScale)*c,_t(t,this._minimumBoundingSphere))for(let f=0;f<u.length;f++){this._atlasIndicesBuffer[r]=u[f];const x=3*f,G=d[x],I=d[x+1],S=d[x+2];this._distancesBuffer[r]=G*a+I*n+S*s,this._sortOrderBuffer[r]=r,r++}else e-=u.length}),e===0)return this.visibleGaussians=0,this._clearBuffersAndTextures(),void this._renderer.requestRender(1);const o={distances:this._distancesBuffer,sortOrderIndices:this._sortOrderBuffer,numGaussians:e,preciseSort:this._useDeterministicSort};await this._workerHandle?.sort(o).then(l=>{this._distancesBuffer=l.distances,this._sortOrderBuffer=l.sortedOrderIndices});const h=async l=>{const u=this._sortedAtlasIndicesBuffer.subarray(0,e);for(let d=0;d<e;d++)u[d]=this._atlasIndicesBuffer[this._sortOrderBuffer[d]];this._orderTexture.setData(u,e),this.visibleGaussians=e,this._renderer.requestRender(1),l.madeProgress()};await this._frameTask.schedule(h)}set useDeterministicSort(e){this._useDeterministicSort=e}}const Y=class Y{constructor(e){this.layerView=e,this._numFadingTiles=We(0)}get numFadingTiles(){return this._numFadingTiles.value}fadeTile(e,t){const a=this._getTargetOpacity(t);if(e.fadeDirection=t,this.fadeDuration===0)return void this._instantTileFading(e,a);const n=e.opacityModifier;if(n!==a){const s=1-Math.abs(a-n);this._startTileFading(e,s)}else this._stopTileFading(e)}updateAllTileFading(e){this.layerView.tileHandles.forEach(t=>this._updateTileFading(t,e)),this.layerView.updateGaussians()}onFadeDurationChanged(e){e===0&&this.numFadingTiles>0&&this._instantlyFullyFadeAllTiles()}isTileFadingOut(e){return e.fadeProgress!=null&&e.fadeDirection===1}get updating(){return this._numFadingTiles.value>0}get fadeDuration(){return 0}get fadingEnabled(){return this.fadeDuration!==0}_startTileFading(e,t){e.fadeProgress==null&&this._numFadingTiles.value++,e.fadeProgress=t}_stopTileFading(e){e.fadeProgress!=null&&(e.fadeDirection===1&&this._onTileFullyFadedOut(e),this._numFadingTiles.value--,e.fadeProgress=null)}_updateTileFading(e,t){const{fadeProgress:a,fadeDirection:n}=e;if(a==null)return;const s=this._fadeDirectionToSign(n),r=s*this.fadeDuration,c=this._getTargetOpacity(n),o=t/Math.abs(r||1),h=Math.min(a+o,1),l=s*(1-(n===0?Y.fadeInEase:Y.fadeOutEase)(h)),u=h===1;e.opacityModifier=u?c:c-l,u?this._stopTileFading(e):e.fadeProgress=h,this._updateOpacityModifier(e)}_updateOpacityModifier(e){const t=255*e.opacityModifier;for(let a=0;a<e.pageIds.length;a++){const n=e.pageIds[a];this.layerView.data.fadingTexture.updateBuffer(t,n)}}_instantTileFading(e,t){e.fadeProgress=null,e.opacityModifier=t,this._updateOpacityModifier(e),e.fadeDirection===1&&this._onTileFullyFadedOut(e)}_instantlyFullyFadeAllTiles(){this.layerView.tileHandles.forEach(e=>{e.fadeProgress!=null&&this._instantTileFading(e,this._getTargetOpacity(e.fadeDirection))}),this.layerView.updateGaussians(),this._numFadingTiles.value=0}_onTileFullyFadedOut(e){e.isVisible=!1,this.layerView.moveTileToCache(e)}_fadeDirectionToSign(e){return e===0?1:-1}_getTargetOpacity(e){return e===0?1:0}};Y.fadeInEase=e=>e*(2-e),Y.fadeOutEase=e=>e*e;let xe=Y;class yi{constructor(e){this.layerView=e,this.type=0,this.slicePlaneEnabled=!1,this.isGround=!1,this.intersectionNormal=R(),this.intersectionRayDir=R(),this.intersectionPlane=vt(),this.layerViewUid=e.uid}intersect(e,t,a,n){const{intersectionRayDir:s,intersectionPlane:r,layerViewUid:c,intersectionNormal:o}=this,h=xt(a,n);Ye(s,n,a);const l=1/yt(s);_e(s,s,l),bt(o,s),wt(r,s[0],s[1],s[2],-Ct(s,a));const u=new me,d=new me,f=e.options.store,x=f===2,G=f!==0,I=x?new Array:null,S=(p,g,v,D,A)=>(p.point=p.point?Pt(p.point,v,D,A):St(v,D,A),p.dist=g,p.normal=o,p.layerViewUid=c,p),he=a[0],de=a[1],pe=a[2],K=s[0],E=s[1],te=s[2];this.layerView.data.forEachTile(p=>{const g=p.obb.minimumDistancePlane(r),v=p.obb.maximumDistancePlane(r),D=v<0,A=u.dist!=null&&d.dist!=null&&u.dist<g*l&&d.dist>v*l;if(D||A||!p.boundingVolumeIntersectsRay(a,s))return;const{positions:z,squaredScales:k,gaussianAtlasIndices:F}=p,y=F.length;for(let H=0,$=0;H<y;H++,$+=3){const O=z[$],b=z[$+1],w=z[$+2],M=O-he,T=b-de,C=w-pe,ie=M*K+T*E+C*te;if(ie<0||M*M+T*T+C*C-ie*ie>k[H])continue;const L=ie*l;if((!t||t(a,n,L))&&((u.dist==null||L<u.dist)&&S(u,L,O,b,w),G&&(d.dist==null||L>d.dist)&&S(d,L,O,b,w),x)){const ct=new me;I.push(S(ct,L,O,b,w))}}});const J=(p,g)=>{const{layerViewUid:v}=g,D=new Dt(g.point,v);p.set(0,D,g.dist,g.normal)};if(Ue(u)){const p=e.results.min;(p.distance==null||u.dist<p.distance)&&J(p,u)}if(Ue(d)&&e.options.store!==0){const p=e.results.max;(p.distance==null||d.dist>p.distance)&&J(p,d)}if(x&&I?.length)for(const p of I){const g=new Tt(h);J(g,p),e.results.all.push(g)}}getElevationRange(e){let t=null;return this.layerView.data.forEachTile(a=>{t?.contains(a.elevationRange)||a.boundingVolumeIntersectsSphere(e)&&(t||(t=new ne),t.expandElevationRange(a.elevationRange))}),t||(t=new ne(0,0)),t}}function Ue(i){return i.dist!=null&&i.point!=null}class me{constructor(){this.point=null,this.dist=null,this.normal=null,this.layerViewUid=""}}let bi=class{constructor(e,t,a,n,s,r,c,o){this.handle=e,this.obb=t,this.gaussianAtlasIndices=a,this.pageIds=n,this.positions=s,this.squaredScales=r,this.maxScale=c,this.elevationRange=o,this.isVisible=!1,this.fadeDirection=0,this.opacityModifier=0,this.usedMemory=At(this.gaussianAtlasIndices,this.positions,this.squaredScales)+this.pageIds.length*st*4;const h=R();t?.getCenter(h),this._obbCenterX=h[0],this._obbCenterY=h[1],this._obbCenterZ=h[2];const l=t?.radius??-1;this._obbRadius=l;const u=l<0?-1:l*l;this._obbRadiusSquared=u;const d=t?.halfSize;this._obbShortestHalfsize=d?Math.min(d[0],d[1],d[2]):0}boundingVolumeIntersectsRay(e,t){if(!this.obb)return!0;const{_obbCenterX:a,_obbCenterY:n,_obbCenterZ:s}=this,r=a-e[0],c=n-e[1],o=s-e[2],h=r*t[0]+c*t[1]+o*t[2],l=r*r+c*c+o*o-h*h;return(this._obbRadiusSquared<0||l<=this._obbRadiusSquared)&&this.obb.intersectRay(e,t)}boundingVolumeIntersectsSphere(e){const t=this._obbRadius;if(t<0)return!0;const a=e.center,n=e.radius,s=t+n,r=this._obbCenterX-a[0];if(r>s)return!1;const c=this._obbCenterY-a[1];if(c>s)return!1;const o=this._obbCenterZ-a[2];if(o>s)return!1;const h=r*r+c*c+o*o;return h>s*s?!1:h<=(this._obbShortestHalfsize+n)**2?!0:Math.sqrt(h)+t<=n||(this.obb?.intersectSphere(e)??!0)}};function wi(i){i.code.add(_`void computeCovariance3D(in mat3 rotation, in vec3 scale, out vec3 covarianceA, out vec3 covarianceB) {
mat3 scaleMatrix = mat3(
vec3(scale.x, 0.0, 0.0),
vec3(0.0, scale.y, 0.0),
vec3(0.0, 0.0, scale.z)
);
mat3 M = scaleMatrix * rotation;
mat3 covariance3D = transpose(M) * M;
covarianceA = vec3(covariance3D[0][0], covariance3D[0][1], covariance3D[0][2]);
covarianceB = vec3(covariance3D[1][1], covariance3D[1][2], covariance3D[2][2]);
}
vec3 computeCovariance2D(vec3 center, float focalLength, vec2 tanFov, float[6] cov3D, mat4 view) {
vec4 viewSpacePoint = vec4(center, 1);
vec2 max = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -max, max) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
mat3 projectionJacobian = mat3(
focalLength * invZ,  0.0,                   -(focalLength * viewSpacePoint.x) * invZSquared,
0.0,                 focalLength * invZ,    -(focalLength * viewSpacePoint.y) * invZSquared,
0.0,                 0.0,                   0.0
);
mat3 worldToView = transpose(mat3(view));
mat3 T = worldToView * projectionJacobian;
mat3 covariance3D = mat3(
cov3D[0], cov3D[1], cov3D[2],
cov3D[1], cov3D[3], cov3D[4],
cov3D[2], cov3D[4], cov3D[5]
);
mat3 covariance2D = transpose(T) * transpose(covariance3D) * T;
const float regularization = 0.3;
covariance2D[0][0] += regularization;
covariance2D[1][1] += regularization;
return vec3(covariance2D[0][0], covariance2D[0][1], covariance2D[1][1]);
}`)}let Ci=class extends Te{constructor(){super(...arguments),this.tileCameraPosition=R(),this.cameraDelta=R()}};function Ti(i){i.code.add(_`vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),i.code.add(_`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),i.code.add(_`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
const ivec3 COMPONENT_ORDER[4] = ivec3[4](
ivec3(3, 2, 1),
ivec3(3, 2, 0),
ivec3(3, 1, 0),
ivec3(2, 1, 0)
);
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
vec4 quaternion = vec4(0.0);
float sumSquares = 0.0;
uint bitfield = packedRotation;
for (int j = 0; j < 3; ++j) {
int index = COMPONENT_ORDER[int(largestComponent)][j];
uint magnitude = bitfield & MASK_9_BITS;
uint signBit = (bitfield >> 9u) & 1u;
bitfield = bitfield >> 10u;
float value = SQRT_HALF * float(magnitude) / float(MASK_9_BITS);
quaternion[index] = signBit == 1u ? -value : value;
sumSquares += value * value;
}
quaternion[int(largestComponent)] = sqrt(1.0 - sumSquares);
return quaternion;
}`),i.code.add(_`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),i.uniforms.add(new Ie("tileCameraPosition",e=>e.tileCameraPosition),new Ie("cameraDelta",e=>e.cameraDelta)).code.add(_`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xfu));
vec3 delta = tileOrigin.xyz - tileCameraPosition;
vec3 cameraRelativePosition = position * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}function Pi(i){i.code.add(_`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}function nt(i){i.code.add(_`vec3 encodeNormalizedDepthToRGB(float normalizedDepth) {
float depth24 = normalizedDepth * 16777215.0;
float high = floor(depth24 / 65536.0);
depth24 -= high * 65536.0;
float mid = floor(depth24 / 256.0);
float low = depth24 - mid * 256.0;
return vec3(high, mid, low) / 255.0;
}`),i.code.add(_`float decodeRGBToNormalizedDepth(vec3 rgb) {
rgb *= 255.0;
float depth = rgb.r * 65536.0 + rgb.g * 256.0 + rgb.b;
depth /= 16777215.0;
return depth;
}`)}class j extends Xe{constructor(e){super(),this.spherical=e,this.alphaCutoff=1,this.fadingEnabled=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.receiveAmbientOcclusion=!1,this.pbrMode=0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!1,this.hasColorTexture=!0}}function Si(i){switch(i){case 2:return .005;case 0:return .05;default:return .01}}m([N({count:3})],j.prototype,"alphaCutoff",void 0),m([N()],j.prototype,"fadingEnabled",void 0),m([N()],j.prototype,"terrainDepthTest",void 0),m([N()],j.prototype,"cullAboveTerrain",void 0),m([N()],j.prototype,"receiveAmbientOcclusion",void 0);class $e extends Ci{constructor(){super(...arguments),this.focalLength=-1,this.minSplatRadius=-1,this.tanFov=Ke()}}function rt(i){const e=new Pe;e.varyings.add("vColor","vec4"),e.varyings.add("conicOpacity","vec4"),e.varyings.add("offsetFromCenter","vec2"),e.vertex.uniforms.add(new fe("splatOrderTexture",s=>s.splatOrder),new fe("splatFadingTexture",s=>s.splatFading),new fe("splatAtlasTexture",s=>s.splatAtlas),new Ee("focalLength",s=>s.focalLength),new Ee("minSplatRadius",s=>s.minSplatRadius),new zt("tanFov",s=>s.tanFov),new Oe("screenSize",({camera:s})=>Je(Di,s.fullWidth,s.fullHeight)),new Re("proj",s=>s.camera.projectionMatrix),new Re("view",s=>s.camera.viewMatrix),new Oe("nearFar",s=>s.camera.nearFar),new Ft("cameraPosition",s=>s.camera.eye)),e.vertex.include(Ti),e.vertex.include(Pi),e.vertex.include(wi),e.vertex.include($t,i),e.include(Mt,i),Gt(e.vertex),It(e.vertex),e.include(Et,i),e.outputs.add("fragColor","vec4",0),e.outputs.add("fragDepthColor","vec4",1);const t=Si(i.alphaCutoff),a=Math.log(t),n=-2*a;return e.vertex.code.add(_`vec2 ndcToPixel(vec2 ndcCoord, vec2 screenSize) {
return ((ndcCoord + 1.0) * screenSize - 1.0) * 0.5;
}`),e.vertex.main.add(`
    uint instanceID = uint(gl_InstanceID);

    // Transform the instanceID into 2D coordinates
    uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
    uint x = instanceID % orderTextureWidth;
    uint y = instanceID / orderTextureWidth;

    // Fetch the index of the remaining frontmost Gaussian
    uint gaussianIndex = texelFetch(splatOrderTexture, ivec2(x, y), 0).r;

    uint splatAtlasWidth = uint(textureSize(splatAtlasTexture, 0).x);

    // Fetch the packed Gaussian according to the index
    uint gaussianIndexX = gaussianIndex % splatAtlasWidth;
    uint gaussianIndexY = gaussianIndex / splatAtlasWidth;
    uvec4 packedGaussian = texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);

    // Fetch the header associated with the packed Gaussian (contains tile origin and number of fractional bits)
    uint pageNum = gaussianIndex / 1024u;
    uint headerIndex = (pageNum + 1u) * 1024u - 1u;
    uint headerIndexX = headerIndex % splatAtlasWidth;
    uint headerIndexY = headerIndex / splatAtlasWidth;
    uvec4 packedHeader = texelFetch(splatAtlasTexture, ivec2(headerIndexX, headerIndexY), 0);

    // Unpack the Gaussian
    vColor = unpackColor(packedGaussian);

    // Handle fading
    ${Qe(i.fadingEnabled,`
      uint fadingTextureWidth = uint(textureSize(splatFadingTexture, 0).x);
      uint fadeX = pageNum  % fadingTextureWidth;
      uint fadeY = pageNum  / fadingTextureWidth;
      uint opacityModifierByte = texelFetch(splatFadingTexture, ivec2(fadeX , fadeY), 0).r;
      float opacityModifier = float(opacityModifierByte) / 255.0;
      vColor.a *= opacityModifier;
      `)}

    // set default position outside clipspace for early returns
    gl_Position = ${Ot};

    if(vColor.a < ${t}) {
      return;
    }

    vec3 scale = unpackScale(packedGaussian);
    vec4 quaternion = unpackQuaternion(packedGaussian);
    mat3 rotation = quaternionToRotationMatrix(quaternion);
    vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

    vec3 cameraRelativePosition = unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition);

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1);

    if (viewPos.z > -nearFar.x || viewPos.z < -nearFar.y) {
      return;
    }

    forwardViewPosDepth(viewPos.xyz);

    // Handle environment (scene lighting)
    vec3 groundNormal = ${i.spherical?_`normalize(cameraRelativePosition + cameraPosition)`:_`vec3(0.0, 0.0, 1.0)`};
    float groundLightAlignment = dot(groundNormal, mainLightDirection);
    float additionalAmbientScale = additionalDirectedAmbientLight(groundLightAlignment);
    vec3 additionalLight = mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
    vColor.rgb = evaluateSceneLighting(groundNormal, vColor.rgb, 0.0, 0.0, mainLightIntensity);

    vec3 covarianceA;
    vec3 covarianceB;
    computeCovariance3D(rotation, scale.xyz, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec3 covariance2D = computeCovariance2D(viewPos.xyz, focalLength, tanFov, covariance3D, view);

    // Compute the Gaussians extent in screen space by finding the eigenvalues lambda1 and lambda2
    // of the 2D covariance matrix
    float mid = 0.5 * (covariance2D.x + covariance2D.z);
    float radius = length(vec2((covariance2D.x - covariance2D.z) * 0.5, covariance2D.y));
    float lambda1 = mid + radius;
    float lambda2 = mid - radius;

    // Compute the extents along the principal axes
    float l1 = ceil(sqrt(lambda1 * ${n}));
    float l2 = ceil(sqrt(lambda2 * ${n}));

    float maxRadius = max(l1, l2);

    // Ignore gaussians with very small contribution, with tolerance based on the quality profile
    if(minSplatRadius > 0.0) {
      float effectiveSize = maxRadius * vColor.a;
      if(effectiveSize < minSplatRadius) {
        return;
      }
    }

    vec4 projPos = proj * viewPos;
    float invW = 1. / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;

    // Screen space frustum culling
    vec2 radiusNDC = maxRadius * 2.0 / screenSize;

    if (any(greaterThan(abs(ndcPos.xy) - radiusNDC, vec2(1.0)))) {
        return;
    }

    // Compute the principal diagonal direction (eigenvector for lambda1)
    vec2 diagonalVector = normalize(vec2(covariance2D.y, lambda1 - covariance2D.x));

    vec2 majorAxis = l1 * diagonalVector;
    vec2 minorAxis = l2 * vec2(diagonalVector.y, -diagonalVector.x);

    vec2 gaussianCenterScreenPos = ndcToPixel(ndcPos.xy, screenSize);

    // This maps vertex IDs 0, 1, 2, 3 to (-1,-1), (1,-1), (-1,1), (1,1)
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.0;
    offsetFromCenter = corner.x * majorAxis + corner.y * minorAxis;

    // Invert covariance (EWA algorithm)
    float determinant = (covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y);
    if (determinant <= 0.) {
      return;
    }
    float invDeterminant = 1. / determinant;

    // We use a conic function to derive the opacity
    vec3 conic = vec3(covariance2D.z, -covariance2D.y, covariance2D.x) * invDeterminant;
    conicOpacity = vec4(conic, vColor.a);

    // Convert from screen-space to clip-space using center + offset
    vec2 clipPos = (gaussianCenterScreenPos + offsetFromCenter) / screenSize * 2. - 1.;

    gl_Position = vec4(clipPos, ndcPos.z, 1.0);

  `),e.fragment.include(nt),e.fragment.main.add(`
    discardByTerrainDepth();

    // Evaluate the 2D elliptical Gaussian exponent using the general conic form: Ax^2+2Bxy+Cy^2
    float x = offsetFromCenter.x;
    float y = offsetFromCenter.y;
    float conic = dot(conicOpacity.xyz, vec3(x * x, 2.0 * x * y, y * y));
    float gaussianExponent = -0.5 * conic;

    // A positive exponent indicates alpha > 1, this should not happen
    // We also early check the alphaCutoff (i.e., ln(alphaCutoff)), to avoid unnecessary exp()
    if (gaussianExponent > 0.0 || gaussianExponent < ${a}) {
      discard;
    }

    float gaussianFalloff = exp(gaussianExponent);

    // cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians
    float alpha = min(.99f, conicOpacity.w * gaussianFalloff);

    fragColor = vec4(vColor.rgb * alpha, alpha);

    // We simulate first hit based depth using 0.25 as the opacity threshold.
    // This works because we render in front-to-back order,
    // i.e. the first hit that counts completelly saturates the alpha channel
    // and further splats do not contribute.
    float countHit = step(0.25, alpha);
    float normalizedDepth = gl_FragCoord.z;
    fragDepthColor = vec4(encodeNormalizedDepthToRGB(normalizedDepth) * countHit, countHit);
  `),e}const Di=Ke(),Ai=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:$e,build:rt},Symbol.toStringTag,{value:"Module"}));let Me=class extends Te{};function ot(i){const e=new Pe;e.include(et);const{hasEmission:t}=i,a=e.fragment;return t&&a.include(Rt),a.uniforms.add(new ae("colorTexture",n=>n.color),new ae("splatOutputColor",n=>n.splatColor)),t&&a.uniforms.add(new ae("emissionTexture",n=>n.emission)),e.outputs.add("fragColor","vec4",0),t&&e.outputs.add("fragEmission","vec4",1),e.fragment.main.add(_`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${Qe(t,_`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitDimming = emissionDimming(splatColor.rgb, srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitDimming, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),e}const zi=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:Me,build:ot},Symbol.toStringTag,{value:"Module"}));let oe=class extends Se{constructor(){super(...arguments),this.shader=new De(zi,()=>Ae(()=>Promise.resolve().then(()=>$i),void 0))}initializePipeline(i){return ze({colorWrite:it,depthTest:null,depthWrite:tt,drawBuffers:{buffers:i.hasEmission?[ve,B]:[ve]}})}};oe=m([ee("esri.views.3d.webgl-engine.shaders.GaussianSplatCompositionTechnique")],oe);class lt extends Xe{constructor(){super(...arguments),this.hasEmission=!1}}m([N()],lt.prototype,"hasEmission",void 0);class Ge extends Te{}function ut(){const i=new Pe;i.include(et);const e=i.fragment;return e.uniforms.add(new ae("splatOutputDepth",t=>t.splatDepth)),e.include(nt),e.main.add(_`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),i}const Fi=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:Ge,build:ut},Symbol.toStringTag,{value:"Module"}));let le=class extends Se{constructor(){super(...arguments),this.shader=new De(Fi,()=>Ae(()=>Promise.resolve().then(()=>Mi),void 0))}initializePipeline(){return ze({colorWrite:null,depthTest:{func:515},depthWrite:tt,drawBuffers:{buffers:[kt]}})}};le=m([ee("esri.views.3d.webgl-engine.shaders.GaussianSplatDepthCompositionTechnique")],le);let ue=class extends Se{constructor(){super(...arguments),this.shader=new De(Ai,()=>Ae(()=>Promise.resolve().then(()=>Gi),void 0))}initializePipeline(){return ze({blending:Ht(773,773,1,1,32774,32774),depthTest:{func:515},colorWrite:it,drawBuffers:{buffers:[ve,B]}})}};ue=m([ee("esri.views.3d.webgl-engine.shaders.GaussianSplatTechnique")],ue);var se,V;let Q=(V=class extends qt{constructor(e){super(e),this._slicePlaneEnabled=!1,this.produces=ke.GAUSSIAN_SPLAT,this.layerView=null,this._passParameters=new $e,this._compositionPassParameters=new Me,this._depthCompositionPassParameters=new Ge,this._compositionConfiguration=new lt,this._previousCameraPosition=R(),this._previousCameraDirection=R(),this._configuration=new j(e.view.state.isGlobal)}async initialize(){this.addHandles([U(()=>this.view.state.camera,()=>this._onCameraChange())])}precompile(){this._configuration.alphaCutoff=this.view.qualitySettings.gaussianSplat.minimumOpacity,this._configuration.terrainDepthTest=this.bindParameters.terrainDepthTest,this._configuration.fadingEnabled=this._fadeHelper.fadingEnabled,this.techniques.precompile(ue,this._configuration),this._compositionConfiguration.hasEmission=this.bindParameters.hasEmission,this.techniques.precompile(oe,this._compositionConfiguration),this.techniques.precompile(le)}render(e){const t=e.find(({name:x})=>x===ke.GAUSSIAN_SPLAT);if(this._handleFading(),!this._data.visibleGaussians||!this._data.orderTexture.texture||!this._data.textureAtlas.texture)return t;const a=t.getAttachment(B);this._compositionConfiguration.hasEmission=a!=null;const n=this.techniques.get(ue,this._configuration),s=this.techniques.get(oe,this._compositionConfiguration),r=this.techniques.get(le);if(!n.compiled||!r.compiled||!s.compiled)return this.requestRender(1),t;const{fullWidth:c,fullHeight:o}=this.bindParameters.camera;this._prepareParameters(o,c);const h=this.renderingContext,l=this.fboCache,u=l.acquire(c,o,"gaussian color output"),d=t.getAttachment(He);u.attachDepth(d),this._renderGaussianColorAndDepth(u,n);const f=l.acquire(c,o,this.produces);return this._depthCompositionPassParameters.splatDepth=u.getTexture(B),f.attachDepth(t.getAttachment(He)),h.bindFramebuffer(f.fbo),h.bindTechnique(r,this.bindParameters,this._depthCompositionPassParameters),h.screen.draw(),this._compositionPassParameters.color=t.getTexture(),this._compositionPassParameters.splatColor=u.getTexture(),a?(f.acquireColor(B,8,"emissive"),this._compositionPassParameters.emission=t.getTexture(B)):this._compositionPassParameters.emission=null,h.bindFramebuffer(f.fbo),h.bindTechnique(s,this.bindParameters,this._compositionPassParameters),h.screen.draw(),u.release(),f}get slicePlaneEnabled(){return this._slicePlaneEnabled}set slicePlaneEnabled(e){this._slicePlaneEnabled!==e&&(this._slicePlaneEnabled=e,this.requestRender(1))}get _data(){return this.layerView.data}get _fadeHelper(){return this.layerView.fadeHelper}destroy(){super.destroy()}_onCameraChange(){const e=this.view.state.camera.eye,t=this.view.state.camera.ray.direction,a=.001;(Math.abs(e[0]-this._previousCameraPosition[0])>a||Math.abs(e[1]-this._previousCameraPosition[1])>a||Math.abs(e[2]-this._previousCameraPosition[2])>a||Math.abs(t[0]-this._previousCameraDirection[0])>a||Math.abs(t[1]-this._previousCameraDirection[1])>a||Math.abs(t[2]-this._previousCameraDirection[2])>a)&&(qe(this._previousCameraPosition,e),qe(this._previousCameraDirection,t),this._data.requestSort())}_prepareParameters(e,t){this._passParameters.splatOrder=this._data.orderTexture.texture,this._passParameters.splatFading=this._data.fadingTexture.texture,this._passParameters.splatAtlas=this._data.textureAtlas.texture;const a=Math.tan(.5*this.camera.fovY),n=a/e*t;Je(this._passParameters.tanFov,n,a),this._passParameters.focalLength=e/(2*a);const s=this.view.qualitySettings.gaussianSplat.minimumSplatPixelRadius;this._passParameters.minSplatRadius=s*Math.sqrt(t*e)/Math.sqrt(2073600),this._prepareHighPrecisionCameraPosition()}_renderGaussianColorAndDepth(e,t){const a=this.renderingContext;e.acquireColor(B,5,"gaussian depth output"),a.bindFramebuffer(e.fbo),a.setClearColor(0,0,0,0),a.clear(16384),this.renderingContext.bindTechnique(t,this.bindParameters,this._passParameters),this.renderingContext.drawArraysInstanced(Bt.TRIANGLE_STRIP,0,4,this._data.visibleGaussians)}_prepareHighPrecisionCameraPosition(){_e(this._passParameters.tileCameraPosition,this.camera.eye,1/se.tileSize),Vt(this._passParameters.tileCameraPosition,this._passParameters.tileCameraPosition),_e(this._passParameters.cameraDelta,this._passParameters.tileCameraPosition,se.tileSize),Ye(this._passParameters.cameraDelta,this.camera.eye,this._passParameters.cameraDelta)}_handleFading(){if(this._fadeHelper.numFadingTiles===0)return void(this._previousFrameStart=null);this._previousFrameStart??=this.view.stage.renderer.renderContext.time;const e=this.view.stage?.renderer.renderContext.time-this._previousFrameStart;this._fadeHelper.updateAllTileFading(e),this._previousFrameStart=this.view.stage.renderer.renderContext.time,this._data.fadingTexture.updateTexture(this._data.textureAtlas.pageAllocator.pageCount)}},se=V,V.tileSize=2.048,V);m([W()],Q.prototype,"produces",void 0),m([W({constructOnly:!0})],Q.prototype,"layerView",void 0),Q=se=m([ee("esri.views.3d.webgl-engine.lib.GaussianSplatRenderNode")],Q);const ge=()=>oi.getLogger("esri.views.3d.layers.GaussianSplatLayerView3D");let q=class extends ui(hi){constructor(i){super(i),this.type="gaussian-splat-3d",this.ignoresMemoryFactor=!1,this._tileHandles=new Map,this._pageBuffer=new Uint32Array(st),this._tmpObbsWithChangedVisibility=new Array,this._frameTask=null,this._wasmLayerId=-1,this._metersPerVCSUnit=1,this._usedMemory=0,this._cacheMemory=0,this._useEsriCrs=!1,this.fullExtentInLocalViewSpatialReference=null,this._suspendedHandle=null,this._conversionBuffer=new ArrayBuffer(4),this._u32View=new Uint32Array(this._conversionBuffer),this._f32View=new Float32Array(this._conversionBuffer);const{view:e}=i;this._memCache=e.resourceController.memoryController.newCache(`GaussianSplat-${this.uid}`,t=>this._deleteTile(t))}initialize(){if(!this._canProjectWithoutEngine())throw Lt("layer",this.layer.spatialReference.wkid,this.view.renderSpatialReference?.wkid);const i=Nt(this).then(e=>{this._wasmLayerId=e,this._renderNode=new Q({view:this.view,layerView:this}),this.data=new xi(this._renderNode),this.fadeHelper=new xe(this),this._intersectionHandler=new yi(this),this.view.sceneIntersectionHelper.addIntersectionHandler(this._intersectionHandler),this._elevationProvider=new ci({view:this.view,layerElevationSource:this,intersectionHandler:this._intersectionHandler}),this.view.elevationProvider.register(2,this._elevationProvider),this.addHandles([U(()=>this.layer.elevationInfo,t=>this._elevationInfoChanged(t))]),this._suspendedHandle=U(()=>this.suspended,t=>this._wasm?.setEnabled(this,!t),Ut),this.setMaximumGaussianCount(this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians)});this.addHandles([U(()=>this.view.qualitySettings.fadeDuration,e=>{this.fadeHelper.onFadeDurationChanged(e),this.data.fadingTexture.updateTexture(this.data.textureAtlas.pageAllocator.pageCount)}),U(()=>this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians,e=>this.setMaximumGaussianCount(e*this.view.quality)),U(()=>this.view.quality,e=>this.setMaximumGaussianCount(this.view.qualitySettings.gaussianSplat.maximumNumberOfGaussians*e))]),this.addResolvingPromise(i),this._frameTask=this.view.resourceController.scheduler.registerTask(Ze.GAUSSIAN_SPLAT_TEXTURE_ATLAS)}get wasmLayerId(){return this._wasmLayerId}get metersPerVCSUnit(){return this._metersPerVCSUnit}get tileHandles(){return this._tileHandles}get _wasm(){return jt(this.view)}get usedMemory(){return this._usedMemory}get cachedMemory(){return this._cacheMemory}get unloadedMemory(){return 0}get useEsriCrs(){return this._useEsriCrs}get elevationProvider(){return this._elevationProvider}get elevationOffset(){return Be(this.layer.elevationInfo)}get elevationRange(){const i=this.fullExtent;return i?.zmin&&i?.zmax?new ne(i.zmin,i.zmax):null}getElevationRange(i){return this._intersectionHandler.getElevationRange(i)}get fullExtent(){return this.layer.fullExtent}get visibleAtCurrentScale(){return Wt(this.layer.effectiveScaleRange,this.view.scale)}isUpdating(){const i=this._wasm;return!(this._wasmLayerId<0||i==null)&&(i.isUpdating(this._wasmLayerId)||this.data.updating||this.fadeHelper.updating)}updatingFlagChanged(){this.notifyChange("updating")}async createRenderable(i){const e=i.meshData;if(e.data==null)throw new Error("meshData.data undefined");if(e.desc=JSON.parse(e.desc),e.desc==null)throw new Error("meshData.desc undefined");const t=e.desc.prims[0],a=t.vertexCount,n=t.atrbs[0].view,s=t.atrbs[0].view.byteCount,r=t.atrbs[0].view.byteOffset;let c=null;if(n.type!=="U32")return ge().warnOnce("unexpected meshData.data format"),{memUsageBytes:0,numGaussians:0};c=new Uint32Array(e.data.buffer,r,s/4);const o=this.extractHeader(c),h=Math.ceil(a/Z),l=new Uint32Array(a),u=new Array;let d=!1,f=0;const x=async F=>{for(;f<h&&!F.done&&!d;f++){let y=this.data.textureAtlas.requestPage();if(y===null&&(this._freeInvisibleTiles(),y=this.data.textureAtlas.requestPage()),y!==null){u.push(y);const H=a-f*Z,$=Math.min(H,Z),O=f*Z;for(let C=0;C<$;C++)l[C+O]=C+X*y;const b=f*Ne;this._pageBuffer.set(c.subarray(b,b+$*re)),this._pageBuffer.set(o.packedHeader,Ne);const w=y*X,M=w%P,T=Math.floor(w/P);this.data.textureAtlas.update(M,T,this._pageBuffer),F.madeProgress()}else d=!0}f<h&&!d&&await this._frameTask.schedule(x)};if(await this._frameTask.schedule(x),d)return ge().warnOnce("ran out of gaussian splat memory"),{memUsageBytes:0,numGaussians:0};const G=new Float64Array(3*a),I=new Float32Array(a),S=2.048,he=o.tileOrigin.x*S,de=o.tileOrigin.y*S,pe=o.tileOrigin.z*S,K=o.invPosScale,E=new ne,te=this.view.state.isGlobal,J=te?Zt(this.view.spatialReference).radius:0;let p=0,g=0,v=0;const D=async F=>{for(;v<a&&!F.done;v++){const y=v*re,{rawX:H,rawY:$,rawZ:O}=this._extractGaussianPosition(c,y),b=this._extractGaussianSphericalScale(c,y),w=H*K+he,M=$*K+de,T=O*K+pe;G[p]=w,G[p+1]=M,G[p+2]=T;const C=te?Math.sqrt(w*w+M*M+T*T)-J:T;E.expandElevationRangeValues(C,C),I[v]=b*b,g=Math.max(g,b),p+=3,F.madeProgress()}v<a&&await this._frameTask.schedule(D)};await this._frameTask.schedule(D);let A=null;if(e.desc.obb){const F=e.desc.obb.quaternion;A=new Ve(e.desc.obb.center,e.desc.obb.halfSize,Yt(...F))}A||(ge().warnOnce("encountered tile without a bounding box"),A=new Ve);const{fullExtent:z}=this.layer;z?.hasZ&&z.zmax&&z.zmin&&(E.minElevation=Math.max(E.minElevation,z.zmin),E.maxElevation=Math.min(E.maxElevation,z.zmax));const k=new bi(i.handle,A,l,u,G,I,g,E);return this._memCache.put(`${k.handle}`,k),this._tileHandles.set(i.handle,k),this._cacheMemory+=k.usedMemory,{memUsageBytes:k.usedMemory,numGaussians:a}}_extractGaussianPosition(i,e){const t=i[e+1];return{rawX:16383&t,rawY:t>>>14&16383,rawZ:t>>>28&15|(1023&i[e+2])<<4}}_extractGaussianSphericalScale(i,e){const t=i[e+2],a=t>>>10&255,n=t>>>18&255,s=t>>>26&63|(3&i[e+3])<<6,r=Math.exp(a/16-10),c=Math.exp(n/16-10),o=Math.exp(s/16-10);return Math.max(r,c,o)}freeRenderable(i){const e=this._tileHandles.get(i);e&&(e.isVisible&&!this.fadeHelper.isTileFadingOut(e)?this._usedMemory-=e.usedMemory:this._cacheMemory-=e.usedMemory,e.pageIds.forEach(t=>this.data.textureAtlas.freePage(t)),this.freeObject(e),this._tileHandles.delete(i)),this.updateGaussians()}freeObject(i){this._memCache.pop(`${i.handle}`)}setRenderableVisibility(i,e,t){const a=this._tmpObbsWithChangedVisibility;a.length=0;for(let n=0;n<t;n++){if(!e[n])continue;const s=i[n],r=this._tileHandles.get(s);r&&(r.isVisible&&!this.fadeHelper.isTileFadingOut(r)||(r.isVisible=!0,a.push(r.obb),this.fadeHelper.isTileFadingOut(r)||this._popTileFromCache(r),this.fadeHelper.fadeTile(r,0)))}for(let n=0;n<t;n++){if(e[n])continue;const s=i[n],r=this._tileHandles.get(s);r&&r.isVisible&&(a.push(r.obb),this.fadeHelper.fadeTile(r,1))}a.length>0&&this._elevationProvider&&this._elevationProvider.notifyObjectsChanged(a),this.updateGaussians()}_popTileFromCache(i){this._usedMemory+=i.usedMemory,this._cacheMemory-=i.usedMemory,this._memCache.pop(`${i.handle}`)}moveTileToCache(i){this._usedMemory-=i.usedMemory,this._cacheMemory+=i.usedMemory,this._memCache.put(`${i.handle}`,i)}destroy(){Xt(this),this._suspendedHandle&&(this._suspendedHandle=Kt(this._suspendedHandle)),this._intersectionHandler&&(this.view.sceneIntersectionHelper.removeIntersectionHandler(this._intersectionHandler),this._intersectionHandler=null),this._elevationProvider&&this.view.elevationProvider&&(this._elevationProvider.notifyObjectsChangedFunctional(i=>{for(const e of this._tileHandles.values())i(e.obb)}),this.view.elevationProvider.unregister(this._elevationProvider),this._elevationProvider=null),this._frameTask.remove(),this._renderNode.destroy(),this.data.destroy(),this._memCache.destroy()}_canProjectWithoutEngine(){if(this.view.state.viewingMode===1||Jt(this.view.renderSpatialReference)||Qt(this.view.renderSpatialReference))return!0;if(this.layer.esriCrsSpatialReference&&ei(this.layer.esriCrsSpatialReference,this.view.renderSpatialReference)){if(this.layer.esriCrsSpatialReference.vcsWkid===115700)return!1;let i=li(this.layer.esriCrsSpatialReference);if(!i){const t=this.layer.esriCrsSpatialReference;let a="meters";!ti(t)&&t.wkid&&t.wkid!==-1&&(a=ii(Le.units[Le[t.wkid]])),a&&(i=new ai({heightModel:"gravity-related-height",heightUnit:a}))}const e=this.view.heightModelInfo;return this._useEsriCrs=si(i,e,!1)===0,this._useEsriCrs&&(i&&(this._metersPerVCSUnit=ni(1,"meters",i.heightUnit)),this.fullExtentInLocalViewSpatialReference=this.layer.esriCrsFullExtent),this._useEsriCrs}return!1}_elevationInfoChanged(i){if(i?.offset)if(this._useEsriCrs){const e=ri(i?.unit)/this._metersPerVCSUnit,t=i?.offset??0;this._wasm?.setLayerOffset(this,t*e)}else this._wasm?.setLayerOffset(this,Be(i));else this._wasm?.setLayerOffset(this,0)}updateGaussians(){const i=new Array;for(const e of this._tileHandles.values())e.isVisible&&i.push(e);this.data.updateGaussianVisibility(i),this.notifyChange("updating")}setMaximumGaussianCount(i){this._wasm?.setMaximumGaussianSplatCount(i)}_freeInvisibleTiles(){for(const i of this._tileHandles.values())i.isVisible||this._deleteTile(i)}extractHeader(i){const e=i.length-4,t=this.reinterpretU32AsFloat(i[e]),a=this.reinterpretU32AsFloat(i[e+1]),n=this.reinterpretU32AsFloat(i[e+2]),s=1/(1<<(255&i[e+3]));return{packedHeader:i.subarray(e,e+4),tileOrigin:{x:t,y:a,z:n},invPosScale:s}}_deleteTile(i){this._wasm?.onRenderableEvicted(this,i.handle,i.usedMemory),this.freeRenderable(i.handle)}reinterpretU32AsFloat(i){return this._u32View[0]=i,this._f32View[0]}get performanceInfo(){let i=0,e=0;return this._tileHandles.forEach(t=>{t.isVisible?i++:e++}),new di(this.usedMemory,i,e,this.cachedMemory)}get test(){}};m([W()],q.prototype,"layer",void 0),m([W()],q.prototype,"elevationOffset",null),m([W({readOnly:!0})],q.prototype,"visibleAtCurrentScale",null),m([W()],q.prototype,"fullExtentInLocalViewSpatialReference",void 0),q=m([ee("esri.views.3d.layers.GaussianSplatLayerView3D")],q);const Wi=q,$i=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:Me,build:ot},Symbol.toStringTag,{value:"Module"})),Mi=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:Ge,build:ut},Symbol.toStringTag,{value:"Module"})),Gi=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:$e,build:rt},Symbol.toStringTag,{value:"Module"}));export{Wi as default};
