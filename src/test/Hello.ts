module mvc {
    class Hello {
        @MVC
        publica: aa.tK
        @MVC
        private privateb: HelloView;
        @MVC protected protectedc: HelloView
    }
    class HelloView1 {
        @MVC
        view: HelloView
        @MVC
        private view1: tt.KK;
        @MVC private view2: mvcInner.Innter
        constructor(){}
    }
    module mvcInner {
        export class Innter{
            @MVC
            view: HelloView1

            @MVC
            self:Innter;
            public aa() {
            }
        }
    }
}
class World {
    @MVC
    view: HelloView
    @MVC
    private view1: HelloView;
    @MVC private view2: HelloView
    public aa() {
    }
}
module tt {
    export class KK{
        @MVC
        view: HelloView
        public aa() {
        }
    }
}
module aa {
    export class tK{
        @MVC
        view: HelloView
        public aa() {
        }
    }
}